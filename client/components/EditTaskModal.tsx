import { View, Text, TextInput, Modal, TouchableOpacity, Alert } from "react-native";
import React from "react";

export default function EditTaskModal({ editModal, setEditModal, editTask, note }: any) {
  const [task, setTask] = React.useState("");
  return (
    <Modal animationType={"slide"} transparent={true} visible={editModal}>
      <View className="m-auto items-center justify-center p-5 bg-slate-50 rounded shadow-lg shadow-black">
        <TextInput
          autoFocus={true}
          onChangeText={setTask}
          value={task}
          multiline={true}
          numberOfLines={4}
          placeholder="Enter text here"
          className="rounded border border-cyan-700 p-2 px-5 w-72 h-20 text-base shadow-sm shadow-cyan-100 bg-slate-50 mb-5"
        />
        <View className="flex-row gap-5">
          <TouchableOpacity
            className="px-8 py-2 bg-cyan-600/70 rounded shadow-xl shadow-cyan-500"
            onPress={() => {
              if (!task || task.trim().length === 0) {
                Alert.alert("Error", "Text cannot be empty", [{ text: "OK" }]);
                return;
              }
              editTask(note.id, "text", task);
              setTask("");
              setEditModal(false);
            }}
          >
            <Text className="text-slate-50 text-base">Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-8 py-2 bg-cyan-600/70 rounded shadow-xl shadow-cyan-500"
            onPress={() => {
              setEditModal(false);
              setTask("");
            }}
          >
            <Text className="text-slate-50 text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
