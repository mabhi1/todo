import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Profile: undefined;
  Signup: undefined;
  User: undefined;
  Home: { username: String };
};

export type StackScreenProps = NativeStackScreenProps<RootStackParamList>;
