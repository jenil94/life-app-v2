import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Center,
  Flex,
  Box,
  Stack,
  TextInput,
  Title,
  Loader,
  LoadingOverlay,
} from "@mantine/core";
import { useState } from "react";
import { IconAt, IconLock, IconUser } from "@tabler/icons-react";
import {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "@/data/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

enum PageType {
  LOGIN = "login",
  REGISTER = "register",
}

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState<PageType>(PageType.LOGIN);
  const navigate = useNavigate();

  const [loginInProgress, setLoginInProgress] = useState(false);

  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [user, loading] = useAuthState(auth);

  const handleLogin = async () => {
    setLoginInProgress(true);
    const { success } = await logInWithEmailAndPassword(email, password);
    if (success) {
      navigate("/");
    }
    setLoginInProgress(false);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Password and Confirm Password should be same");
      return;
    }
    setLoginInProgress(true);
    const { success } = await registerWithEmailAndPassword(
      name,
      email,
      password,
    );
    if (success) {
      navigate("/");
    }
    setLoginInProgress(false);
  };

  if (!user && loading) {
    return (
      <Center h={"100vh"} w={"100vw"}>
        <Loader />
      </Center>
    );
  }

  function renderSignUp() {
    return (
      <Stack p="lg" w={420} gap="sm" pos="relative">
        <LoadingOverlay
          visible={loginInProgress}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Center>
          <Title order={4}>Login to Your Account</Title>
        </Center>
        <Stack justify="center">
          <TextInput
            label="Full Name"
            placeholder="Your Name"
            value={name}
            leftSection={<IconUser size={20} />}
            onChange={(event) => setName(event.currentTarget.value)}
            inputWrapperOrder={["label", "error", "input", "description"]}
          />
          <TextInput
            label="Email"
            placeholder="Your Email"
            value={email}
            leftSection={<IconAt size={20} />}
            onChange={(event) => setEmail(event.currentTarget.value)}
            inputWrapperOrder={["label", "error", "input", "description"]}
          />
          <TextInput
            label="Password"
            placeholder="Password"
            type="password"
            value={password}
            leftSection={<IconLock size={20} />}
            onChange={(event) => setPassword(event.currentTarget.value)}
            inputWrapperOrder={["label", "error", "input", "description"]}
          />
          <TextInput
            label="Confirm Password"
            placeholder="Password"
            type="password"
            value={confirmPassword}
            leftSection={<IconLock size={20} />}
            onChange={(event) => setConfirmPassword(event.currentTarget.value)}
            inputWrapperOrder={["label", "error", "input", "description"]}
          />
          <Button fullWidth onClick={handleRegister}>
            Register
          </Button>
          <Stack gap={"sm"}>
            <Text
              size="sm"
              c="dimmed"
              style={{
                cursor: "pointer",
              }}
              onClick={() => setPage(PageType.LOGIN)}
            >
              Already have account? Login Here
            </Text>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  function renderLogin() {
    return (
      <Stack p="lg" w={420} gap="md" pos="relative">
        <LoadingOverlay
          visible={loginInProgress}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Center>
          <Title order={4}>Login to Your Account</Title>
        </Center>
        <Stack justify="center">
          <TextInput
            label="Email"
            placeholder="Your Email"
            value={email}
            leftSection={<IconAt size={20} />}
            onChange={(event) => setEmail(event.currentTarget.value)}
            inputWrapperOrder={["label", "error", "input", "description"]}
          />
          <TextInput
            label="Password"
            placeholder="Password"
            type="password"
            value={password}
            leftSection={<IconLock size={20} />}
            onChange={(event) => setPassword(event.currentTarget.value)}
            inputWrapperOrder={["label", "error", "input", "description"]}
          />
          <Button fullWidth onClick={handleLogin}>
            Login
          </Button>
          <Stack gap={"sm"}>
            <Text
              size="sm"
              c="dimmed"
              style={{
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </Text>
            <Text
              size="sm"
              c="dimmed"
              style={{
                cursor: "pointer",
              }}
              onClick={() => setPage(PageType.REGISTER)}
            >
              Don't have account? Register Here
            </Text>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  return (
    <Center h={"100vh"} w={"100vw"}>
      <Card shadow="sm" padding="lg" radius="md" withBorder h={460}>
        <Card.Section>
          <Flex>
            <Box w={420} h={460}>
              <Image
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                height={460}
                w={420}
                alt="Norway"
              />
            </Box>
            {page === PageType.LOGIN ? renderLogin() : null}
            {page === PageType.REGISTER ? renderSignUp() : null}
          </Flex>
        </Card.Section>
      </Card>
    </Center>
  );
}
