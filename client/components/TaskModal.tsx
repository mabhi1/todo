import { View, TextInput, Modal, TouchableOpacity, Text } from "react-native";
import React from "react";
import axios from "axios";
import url from "../serverURL";

export default function TaskModal({ isModal, setIsModal, username, setTodoData }: any) {
  const [task, setTask] = React.useState("");
  const handleCancel = () => {
    setIsModal(false);
  };
  const handleSubmit = async () => {
    try {
      await axios.post(`${url}/todo/${username}`, {
        text: task,
      });
      const { data } = await axios.get(`${url}/todo/${username}`);
      setTodoData(data.items);
      setIsModal(false);
      setTask("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal animationType={"slide"} transparent={true} visible={isModal}>
      <View className="m-auto items-center justify-center p-5 bg-slate-50 rounded shadow-lg shadow-black">
        <TextInput
          autoFocus={true}
          onChangeText={setTask}
          value={task}
          multiline={true}
          numberOfLines={4}
          placeholder="Enter Task"
          className="rounded border border-cyan-700 p-2 px-5 w-72 h-20 text-base shadow-sm shadow-cyan-100 bg-slate-50 mb-5"
        />
        <View className="flex-row gap-5">
          <TouchableOpacity className="px-8 py-2 bg-cyan-600/70 rounded shadow-xl shadow-cyan-500" onPress={handleSubmit}>
            <Text className="text-slate-50 text-base">Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-8 py-2 bg-cyan-600/70 rounded shadow-xl shadow-cyan-500" onPress={handleCancel}>
            <Text className="text-slate-50 text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
