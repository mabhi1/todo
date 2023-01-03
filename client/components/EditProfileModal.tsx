import { View, Text, TextInput, Modal, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import url from "../serverURL";

export default function EditProfileModal({ editModal, setEditModal, user, setUser }: any) {
  const [firstName, setFirstName] = React.useState(user.first_name);
  const [lastName, setLastName] = React.useState(user.last_name);
  const [email, setEmail] = React.useState(user.email);

  const handleSave = async () => {
    if (!firstName || firstName.trim().length === 0 || !lastName || lastName.trim().length === 0 || !email || email.trim().length === 0) {
      Alert.alert("Error", "Fill all the fields to continue", [{ text: "OK" }]);
      return;
    }
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      Alert.alert("Message", "Invalid email. Please enter your email again", [{ text: "OK" }]);
      return;
    }
    let updatedUser = { ...user };
    updatedUser.first_name = firstName;
    updatedUser.last_name = lastName;
    updatedUser.email = email;
    try {
      await axios.put(`${url}/user/edit/${user.username}`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
      });
      setUser(updatedUser);
      Alert.alert("Success", "Profile updated", [{ text: "OK" }]);
      setFirstName(updatedUser.first_name);
      setLastName(updatedUser.last_name);
      setEmail(updatedUser.email);
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.response.data.message, [{ text: "OK" }]);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
    }
    setEditModal(false);
  };

  return (
    <Modal animationType={"slide"} transparent={true} visible={editModal}>
      <View className="m-auto items-center justify-center p-5 bg-slate-50 rounded shadow-lg shadow-black">
        <View className="flex-row items-center mb-5">
          <View className="-mr-8 z-10">
            <Ionicons name="pencil-outline" color="#3281a8" size={25} />
          </View>
          <TextInput
            onChangeText={setFirstName}
            value={firstName}
            style={{
              height: 40,
              width: 250,
            }}
            autoFocus={true}
            placeholder="Enter First Name"
            className="rounded border border-cyan-700 p-2 px-10 text-base shadow-sm shadow-cyan-100 bg-slate-50"
          />
        </View>
        <View className="flex-row items-center mb-5">
          <View className="-mr-8 z-10">
            <Ionicons name="newspaper-outline" color="#3281a8" size={25} />
          </View>
          <TextInput
            onChangeText={setLastName}
            value={lastName}
            style={{
              height: 40,
              width: 250,
            }}
            placeholder="Enter Last Name"
            className="rounded border border-cyan-700 p-2 px-10 text-base shadow-sm shadow-cyan-100 bg-slate-50"
          />
        </View>
        <View className="flex-row items-center mb-5">
          <View className="-mr-8 z-10">
            <Ionicons name="at" color="#3281a8" size={25} />
          </View>
          <TextInput
            onChangeText={setEmail}
            value={email}
            style={{
              height: 40,
              width: 250,
            }}
            placeholder="Enter Email"
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
              setFirstName(user.first_name);
              setLastName(user.last_name);
              setEmail(user.email);
              setEditModal(false);
            }}
          >
            <Text className="text-slate-50 text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
