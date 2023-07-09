import { Center, Stack } from "@chakra-ui/react";
import { TailSpin } from "react-loader-spinner";

export default function Loader() {
  return (
    <Stack>
      <Center>
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </Center>
    </Stack>
  );
}
