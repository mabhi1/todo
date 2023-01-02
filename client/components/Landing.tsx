import { Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function Landing({ navigation }: any) {
  return (
    <View className="items-center justify-center h-screen gap-5">
      <Image
        source={{ uri: "https://zanderpaul.com/wp-content/uploads/2019/08/zptodo_app_icon-1024x1024.png" }}
        style={{ width: 100, height: 100 }}
      />
      <Text className="text-slate-900 text-2xl">Welcome to todo app</Text>
      <View className="flex-row gap-x-5">
        <TouchableOpacity className="px-8 py-2 bg-cyan-600/70 rounded shadow-xl shadow-cyan-500" onPress={() => navigation.navigate("Login")}>
          <Text className="text-slate-50 text-lg">Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-8 py-2 bg-cyan-600/70 rounded shadow-xl shadow-cyan-500">
          <Text className="text-slate-50 text-lg">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
