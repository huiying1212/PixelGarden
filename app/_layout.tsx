<<<<<<< Updated upstream
import { Stack } from "expo-router";
=======
// app/_layout.tsx
import { useRouter, Stack, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import supabase from "./config/supabase";
>>>>>>> Stashed changes

export default function RootLayout() {
  return <Stack />;
}
