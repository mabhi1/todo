import { Text, Button, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView>
      <View>
        <Text className="text-slate-50">Welcome to todo app</Text>
        <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
      </View>
    </SafeAreaView>
  );
}
