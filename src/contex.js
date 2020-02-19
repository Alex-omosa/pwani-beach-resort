import React, { Component } from "react";
// import items from "./data";
import client from "./Contentful";

const RoomContext = React.createContext();
class RoomProvider extends Component {
  state = {
    rooms: [],
    featuredRooms: [],
    sortedRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    maxPrice: 0,
    minPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };
  // getData
  getData = async () => {
    try {
      let response = await client.getEntries({
        content_type: "beachResort",
        order: "sys.createdAt"
      });
      console.log(response.items);
      let rooms = this.formaData(response.items);
      let featuredRooms = rooms.filter(room => room.featured === true);
      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));
      this.setState({
        rooms,
        sortedRooms: rooms,
        featuredRooms,
        loading: false,
        maxPrice,
        price: maxPrice,
        maxSize
      });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.getData();
  }
  formaData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => {
        return image.fields.file.url;
      });
      let rooms = { ...item.fields, id, images };
      return rooms;
    });
    return tempItems;
  }
  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };
  filterRooms() {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;
    // All rooms.
    let tempRooms = [...rooms];
    // Tranform value.
    capacity = parseInt(capacity);
    price = parseInt(price);
    // Filter by type.
    if (type !== "all") {
      tempRooms = tempRooms.filter(item => item.type === type);
    }
    // Filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(item => item.capacity >= capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter(item => item.price <= price);
    // Filter by size
    tempRooms = tempRooms.filter(
      item => item.size >= minSize && item.size <= maxSize
    );
    // Filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(item => item.breakfast === true);
    }
    // Filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(item => item.pets === true);
    }
    // change state
    this.setState({
      sortedRooms: tempRooms
    });
  }
  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}
const RoomConsumer = RoomContext.Consumer;
export { RoomProvider, RoomContext, RoomConsumer };
