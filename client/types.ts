import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Profile: undefined;
  Signup: undefined;
  User: undefined;
  Home: undefined;
};

export type StackScreenProps = NativeStackScreenProps<RootStackParamList>;
