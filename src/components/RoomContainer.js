import React from "react";
import RoomList from "./RoomList";
import RoomFilter from "./RoomFilter";
import { RoomConsumer } from "../contex";
import Loading from "./Loading";

export default function RoomContainer() {
  return (
    <RoomConsumer>
      {value => {
        let { loading, rooms, sortedRooms } = value;
        if (loading) {
          return <Loading />;
        }
        return (
          <div>
            <RoomFilter rooms={rooms} />
            <RoomList rooms={sortedRooms} />
          </div>
        );
      }}
    </RoomConsumer>
  );
}
