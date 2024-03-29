import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import url from "../serverURL";

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [processing, setProcessing] = React.useState(false);

  const handleSubmit = async () => {
    if (!username || username.trim().length == 0 || !password || password.trim().length == 0) {
      Alert.alert("Message", "Please enter username and password to login", [{ text: "OK" }]);
      return;
    }
    setProcessing(true);
    try {
      const { data } = await axios.post(`${url}/user/login/`, {
        username: username,
        password: password,
      });
      console.log(data);
      Alert.alert("Message", "Login Successful", [{ text: "OK" }]);
      navigation.reset({
        index: 0,
        routes: [{ name: "User", params: { username } }],
      });
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.response.data.message, [{ text: "OK" }]);
    }
    setProcessing(false);
  };

  return (
    <SafeAreaView className="justify-start items-center flex-1 gap-y-5">
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
          autoFocus={true}
          placeholder="Enter Username"
          className="rounded border border-cyan-700 p-2 px-10 text-base shadow-sm shadow-cyan-100 bg-slate-50"
        />
      </View>
      <View className="flex-row items-center">
        <View className="-mr-8 z-10">
          <Ionicons name="lock-closed" color="#3281a8" size={25} />
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
        <Text className="text-slate-50 text-base">{processing ? "Please Wait.." : "Login"}</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text className="text-base">Don't have an account. Sign up here</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}
