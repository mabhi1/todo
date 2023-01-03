import { View, Text, TextInput, Modal, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

export default function EditPasswordModal({ passwordModal, setPasswordModal, user }: any) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSave = async () => {
    if (!password || password.trim().length === 0 || !confirmPassword || confirmPassword.trim().length === 0) {
      Alert.alert("Error", "Fill all the fields to continue", [{ text: "OK" }]);
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match", [{ text: "OK" }]);
      return;
    }
    try {
      await axios.put(`https://4d60-108-50-188-138.ngrok.io/user/edit/${user.username}`, {
        password: password,
      });
      Alert.alert("Success", "Password updated", [{ text: "OK" }]);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Password cannot be updated", [{ text: "OK" }]);
    }
    setPassword("");
    setConfirmPassword("");
    setPasswordModal(false);
  };

  return (
    <Modal animationType={"slide"} transparent={true} visible={passwordModal}>
      <View className="m-auto items-center justify-center p-5 bg-slate-50 rounded shadow-lg shadow-black">
        <View className="flex-row items-center mb-5">
          <View className="-mr-8 z-10">
            <Ionicons name="key-outline" color="#3281a8" size={25} />
          </View>
          <TextInput
            onChangeText={setPassword}
            value={password}
            style={{
              height: 40,
              width: 250,
            }}
            placeholder="Enter new password"
            className="rounded border border-cyan-700 p-2 px-10 text-base shadow-sm shadow-cyan-100 bg-slate-50"
          />
        </View>
        <View className="flex-row items-center mb-5">
          <View className="-mr-8 z-10">
            <Ionicons name="lock-closed" color="#3281a8" size={25} />
          </View>
          <TextInput
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            style={{
              height: 40,
              width: 250,
            }}
            placeholder="Confirm password"
            className="rounded border border-cyan-700 p-2 px-10 text-base shadow-sm shadow-cyan-100 bg-slate-50"
          />
        </View>
        <View className="flex-row gap-5">
          <TouchableOpacity className="px-8 py-2 bg-cyan-600/70 rounded shadow-xl shadow-cyan-500" onPress={handleSave}>
            <Text className="text-slate-50 text-base">Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-8 py-2 bg-cyan-600/70 rounded shadow-xl shadow-cyan-500"
            onPress={() => {
              setPassword("");
              setConfirmPassword("");
              setPasswordModal(false);
            }}
          >
            <Text className="text-slate-50 text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
