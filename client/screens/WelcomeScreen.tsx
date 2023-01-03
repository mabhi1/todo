import { Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import axios from "axios";
import url from "../serverURL";

export default function WelcomeScreen({ navigation }: any) {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(`${url}/user/`);
        console.log(data);
        navigation.reset({
          index: 0,
          routes: [{ name: "User", params: { username: data.username } }],
        });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getData();
  }, []);
  if (loading) {
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg text-slate-400">Please Wait...</Text>
    </View>;
  } else {
    return (
      <View className="items-center justify-center h-screen gap-y-5">
        <Image
          source={{ uri: "https://zanderpaul.com/wp-content/uploads/2019/08/zptodo_app_icon-1024x1024.png" }}
          style={{ width: 100, height: 100 }}
        />
        <Text className="text-slate-900 text-2xl">Welcome to todo app</Text>
        <View className="flex-row gap-5 flex-wrap">
          <TouchableOpacity className="px-8 py-2 bg-cyan-600/70 rounded shadow-xl shadow-cyan-500" onPress={() => navigation.navigate("Login")}>
            <Text className="text-slate-50 text-lg">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-8 py-2 bg-cyan-600/70 rounded shadow-xl shadow-cyan-500" onPress={() => navigation.navigate("Signup")}>
            <Text className="text-slate-50 text-lg">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
