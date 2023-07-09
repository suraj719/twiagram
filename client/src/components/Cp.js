import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {useAuthUser} from 'react-auth-kit'

export default function Cp() {
  //   function ReturnFocus() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [img, setImg] = useState("");
  const [caption, setCaption] = useState("");
  const auth = useAuthUser()
//   console.log(auth().username)

  const handlesubmit = (e) => {
    e.preventDefault();
    var reader = new FileReader();
    reader.readAsDataURL(img.target.files[0]);

    reader.onload = async () => {
        fetch("https://twiagrambackend.onrender.com/api/posts", {
            method: "POST",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              base64: reader.result,
              caption: caption,
              user:auth().username,
            }),
          });
        onClose();
    };
    reader.onerror = (error) => {
      console.log("err: ", error);
    };
  };
  return (
    <>
      <Button mt={4} onClick={onOpen}>
        Create Post
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <input
                accept="image/"
                type={"file"}
                id="upload"
                onChange={(e) => setImg(e)}
              ></input>
              <FormControl id="caption">
                <FormLabel>Caption: </FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setCaption(e.target.value)}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handlesubmit} colorScheme={"teal"}>post</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
