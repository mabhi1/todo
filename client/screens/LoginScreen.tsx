import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
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
      <TouchableOpacity className="px-8 py-2 bg-cyan-600/70 rounded shadow-xl shadow-cyan-500">
        <Text className="text-slate-50 text-base">Login</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text className="text-base">Don't have an account. Sign up here</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}
