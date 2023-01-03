import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { Key } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import TaskModal from "../components/TaskModal";
import Ionicons from "react-native-vector-icons/Feather";
import AntIcons from "react-native-vector-icons/AntDesign";
import CheckBox from "expo-checkbox";
import EditTaskModal from "../components/EditTaskModal";

interface NoteData {
  id: KeyType;
  text: String;
  complete: Boolean;
}

type OnlyKeys = keyof NoteData;

export default function HomeScreen({ route }: any) {
  const [isModal, setIsModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const { username } = route.params;
  const [editNote, setEditNote] = React.useState<NoteData | undefined>();

  const [todoData, setTodoData] = React.useState<NoteData[] | undefined>();
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

  const handleModal = () => {
    setIsModal(true);
  };

  const editTask = async (id: Key, prop: OnlyKeys, value: KeyType | String | Boolean) => {
    let newTask: any;
    let newTaskList: NoteData[] | undefined = todoData?.map((todo: any) => {
      if (todo.id === id) {
        todo[prop] = value;
        newTask = todo;
      }
      return todo;
    });
    try {
      await axios.put(`https://4d60-108-50-188-138.ngrok.io/todo/${username}`, {
        id: newTask.id,
        complete: newTask.complete,
        text: newTask.text,
      });
    } catch (error) {
      console.log(error);
    }
    setTodoData(newTaskList);
  };

  const handleDelete = async (id: any) => {
    Alert.alert("alert", "Confirm to delete!", [
      {
        text: "Delete",
        onPress: async () => {
          let newTaskList: NoteData[] | undefined = todoData?.filter((todo: any) => {
            return todo.id !== id;
          });
          try {
            await axios.delete(`https://4d60-108-50-188-138.ngrok.io/todo/${username}`, {
              data: {
                id,
              },
            });
          } catch (error) {
            console.log(error);
          }
          setTodoData(newTaskList);
        },
      },
      { text: "Cancel" },
    ]);
  };

  return (
    <SafeAreaView className="h-screen justify-evenly pt-10">
      <TaskModal isModal={isModal} setIsModal={setIsModal} setTodoData={setTodoData} username={username} />
      <EditTaskModal editModal={editModal} setEditModal={setEditModal} editTask={editTask} note={editNote} />
      <View className="flex-row justify-between mx-5">
        <Text className="text-3xl">Tasks</Text>
        {!loading && (
          <TouchableOpacity className="bg-cyan-600/70 p-1 px-3 rounded shadow-xl shadow-cyan-500" onPress={handleModal}>
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
        <View className="flex-1 p-2 pb-6 bg-slate-50 mt-5">
          <ScrollView className="gap-y-2" fadingEdgeLength={5}>
            {todoData &&
              todoData.map((note) => {
                return (
                  <View
                    key={note.id}
                    className={note.complete === true ? "bg-green-100 rounded shadow shadow-black" : "bg-red-100 rounded shadow shadow-black"}
                  >
                    <Text className="text-slate-900 p-5 text-lg">{note.text}</Text>
                    <View className="flex-row w-full justify-between p-2 border-t-2 items-center border-slate-300">
                      <View className="flex-row gap-2 items-center">
                        <CheckBox value={note.complete === true ? true : false} onValueChange={() => editTask(note.id, "complete", !note.complete)} />
                        {note.complete ? <Text>Completed</Text> : <Text>Pending</Text>}
                      </View>
                      <View className="flex-row gap-x-5 border-slate-300">
                        <TouchableOpacity
                          onPress={() => {
                            setEditModal(true);
                            setEditNote(note);
                          }}
                        >
                          <Ionicons name="edit" color="black" size={22} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(note.id)}>
                          <AntIcons name="delete" color="black" size={22} />
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
