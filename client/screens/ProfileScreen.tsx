import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import EditProfileModal from "../components/EditProfileModal";
import EditPasswordModal from "../components/EditPasswordModal";

type User = {
  first_name: String;
  last_name: String;
  username: String;
  email: String;
};

const text = "text-lg";

export default function ProfileScreen({ navigation }: any) {
  const [userData, setUserData] = React.useState<User | null>(null);
  const [editModal, setEditModal] = React.useState(false);
  const [passwordModal, setPasswordModal] = React.useState(false);

  React.useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get("https://4d60-108-50-188-138.ngrok.io/user/");
        console.log(data);
        setUserData(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("https://4d60-108-50-188-138.ngrok.io/user/logout");
    } catch (error) {
      console.log(error);
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "Welcome" }],
    });
  };

  return (
    <SafeAreaView className="h-screen justify-start pt-10">
      <View className="flex-row justify-between mx-5">
        <Text className="text-3xl">Profile</Text>
        {userData && (
          <TouchableOpacity className="bg-red-600/70 p-1 px-3 rounded shadow-xl shadow-cyan-500" onPress={handleLogout}>
            <Text className="text-lg text-slate-50">Logout</Text>
          </TouchableOpacity>
        )}
      </View>
      {!userData ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-slate-400">Loading Profile...</Text>
        </View>
      ) : (
        <View className="m-5">
          <EditProfileModal editModal={editModal} setEditModal={setEditModal} user={userData} setUser={setUserData} />
          <EditPasswordModal passwordModal={passwordModal} setPasswordModal={setPasswordModal} user={userData} />
          <Text className={text}>First Name : {userData.first_name}</Text>
          <Text className={text}>Last Name : {userData.last_name}</Text>
          <Text className={text}>Username : {userData.username}</Text>
          <Text className={text}>Email : {userData.email}</Text>
          <View className="mt-10 flex-row justify-evenly items-center">
            <TouchableOpacity className="bg-cyan-600/70 p-1 px-3 rounded shadow-xl shadow-cyan-500" onPress={() => setEditModal(true)}>
              <Text className={text + " text-slate-50"}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-cyan-600/70 p-1 px-3 rounded shadow-xl shadow-cyan-500" onPress={() => setPasswordModal(true)}>
              <Text className={text + " text-slate-50"}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
