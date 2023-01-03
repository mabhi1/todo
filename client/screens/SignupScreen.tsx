import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import url from "../serverURL";

export default function SignupScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [processing, setProcessing] = React.useState(false);

  const handleSubmit = async () => {
    if (
      !username ||
      username.trim().length == 0 ||
      !password ||
      password.trim().length == 0 ||
      !firstName ||
      firstName.trim().length == 0 ||
      !lastName ||
      lastName.trim().length == 0 ||
      !email ||
      email.trim().length == 0
    ) {
      Alert.alert("Message", "Please fill all the details to continue!", [{ text: "OK" }]);
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
    setProcessing(true);
    try {
      const { data } = await axios.post(`${url}/user/`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        username: username,
      });
      console.log(data);
      Alert.alert("Success", data.message, [{ text: "OK" }]);
      setUsername("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setEmail("");
    } catch (error: any) {
      console.log(error.response.data.message);
      Alert.alert("Error", error.response.data.message, [{ text: "OK" }]);
    }
    setProcessing(false);
  };
  return (
    <SafeAreaView className="justify-start items-center flex-1 gap-y-5">
      <View className="flex-row items-center">
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
      <View className="flex-row items-center">
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
      <View className="flex-row items-center">
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
      <View className="flex-row items-center">
        <View className="-mr-8 z-10">
          <Ionicons name="md-person-circle-outline" color="#3281a8" size={25} />
        </View>
        <TextInput
          onChangeText={setUsername}
          value={username}
          style={{
            height: 40,
            width: 250,
          }}
          placeholder="Enter Username"
          className="rounded border border-cyan-700 p-2 px-10 text-base shadow-sm shadow-cyan-100 bg-slate-50"
        />
      </View>
      <View className="flex-row items-center">
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
          secureTextEntry={true}
          placeholder="Enter Password"
          className="rounded border border-cyan-700 p-2 px-10 text-base shadow-sm shadow-cyan-100 bg-slate-50"
        />
      </View>
      <TouchableOpacity
        className={processing ? "px-8 py-2 bg-slate-600/70 rounded" : "px-8 py-2 bg-cyan-600/70 rounded shadow-xl shadow-cyan-500"}
        disabled={processing}
        onPress={handleSubmit}
      >
        <Text className="text-slate-50 text-base">{processing ? "Please Wait.." : "Signup"}</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity>
        <Text className="text-base">Already have an account. Login here</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}
