import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

type Note = [
  {
    id: KeyType;
    text: String;
    complete: Boolean;
  }
];

export default function HomeScreen({ route }: any) {
  const { username } = route.params;

  const [todoData, setTodoData] = React.useState<Note | undefined>();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(`https://4d60-108-50-188-138.ngrok.io/todo/${username}`);
        console.log(data);
        setTodoData(data.items);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  return (
    <SafeAreaView className="h-screen justify-evenly pt-10">
      <View className="flex-row justify-between mx-5">
        <Text className="text-3xl">Tasks</Text>
        {!loading && (
          <TouchableOpacity className="bg-cyan-600/70 p-1 px-3 rounded shadow-xl shadow-cyan-500">
            <Text className="text-lg text-slate-50">Add Task</Text>
          </TouchableOpacity>
        )}
      </View>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-slate-400">Loading Tasks...</Text>
        </View>
      ) : todoData && todoData.length <= 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-slate-400">No Task to display</Text>
        </View>
      ) : (
        <View className="flex-1">
          <ScrollView className="gap-y-2 mx-2 mt-5" fadingEdgeLength={5}>
            {todoData &&
              todoData.map((note) => {
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
                          source={{
                            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/1024px-Flat_tick_icon.svg.png",
                          }}
                        />
                      ) : (
                        <Image
                          style={{ width: 20, height: 20 }}
                          source={{
                            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flat_cross_icon.svg/1200px-Flat_cross_icon.svg.png",
                          }}
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
      )}
    </SafeAreaView>
  );
}
