import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";

export default function NoteList() {
  let Notes = [
    {
      id: 1,
      text: "Hello World Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis sapiente vitae cumque numquam repellat rerum commodi architecto nisi veniam iusto.",
      complete: false,
    },
    { id: 2, text: "Hello World 2", complete: true },
    { id: 3, text: "Hello World 3", complete: false },
    { id: 4, text: "Hello World 2", complete: true },
    { id: 5, text: "Hello World 3", complete: false },
    { id: 6, text: "Hello World 2", complete: true },
    { id: 7, text: "Hello World 3", complete: false },
    { id: 8, text: "Hello World 2", complete: true },
    { id: 9, text: "Hello World 3", complete: false },
    { id: 10, text: "Hello World 2", complete: true },
    { id: 11, text: "Hello World 3", complete: false },
    { id: 12, text: "Hello World 2", complete: true },
    { id: 13, text: "Hello World 3", complete: false },
  ];
  return (
    <View className="h-screen justify-evenly pt-10">
      <Text className="text-3xl ml-5">Tasks</Text>

      <View className="flex-1">
        <ScrollView className="gap-y-2 mx-2 mt-5" fadingEdgeLength={5}>
          {Notes.map((note) => {
            return (
              <View key={note.id} className="bg-slate-50 rounded shadow shadow-black">
                <Text className="text-slate-900 p-5 text-base">
                  {note.text + " "}
                  {note.id}
                </Text>
                <View className="flex-row w-full justify-between p-2 border-t-2 items-center border-slate-100">
                  {note.complete ? (
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/1024px-Flat_tick_icon.svg.png" }}
                    />
                  ) : (
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flat_cross_icon.svg/1200px-Flat_cross_icon.svg.png" }}
                    />
                  )}
                  <View className="flex-row gap-x-3 border-slate-300">
                    <TouchableOpacity className="bg-cyan-900 p-1 px-2 rounded">
                      {note.complete ? <Text className="text-slate-50">Unmark</Text> : <Text className="text-slate-50">Mark</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-cyan-900 p-1 px-2 rounded shadow shadow-white">
                      <Text className="text-slate-50">Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View>
        <TouchableOpacity className="px-8 py-3 bg-cyan-600/70 rounded shadow-xl shadow-cyan-500 mt-1 items-center">
          <Text className="text-slate-50 text-lg">Add new task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
