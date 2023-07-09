// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "@chakra-ui/react";
// import Cp from "./Cp";
// export default function CreatePost() {
//   const [img, setImg] = useState("");
//   const [imgs, setImgs] = useState("");
//   const [allimgs, setallimgs] = useState([]);
//   const [caption, setCaption] = useState("");
//   const handlesubmit = (e) => {
//     e.preventDefault();
//     // console.log(e.target.value)
//     var reader = new FileReader();
//     // reader.readAsDataURL(e.target.files[0]);
//     reader.readAsDataURL(img.target.files[0]);

//     reader.onload = () => {
//       console.log(reader.result);
//       setImgs(reader.result);
//       // try {
//       //      const resp = axios.post("/api/posts",{
//       //         // image:JSON.stringify(imgs),
//       //         // image:imgs,
//       //         image:imgs.toString("base64"),
//       //         caption:caption,
//       //     });
//       //   } catch (error) {
//       //     console.log(error);
//       //   }
//     };
//     reader.onerror = (error) => {
//       console.log("err: ", error);
//     };
//   };
// //   const getp = () => {
// //     axios.get("/api/posts").then((data) => setallimgs(data.data.posts));
// //   };
//   function uploadimage() {
//     fetch("/api/posts",{
//         method:"POST",
//         crossDomain: true,
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             "Access-Control-Allow-Origin":"*",
//         },
//         body: JSON.stringify({
//             base64:imgs,
//             caption:caption
//         })
//     })
//     // axios.post("/api/posts",{
//     //     //         // image:JSON.stringify(imgs),
//     //             base64:imgs,
//     //             caption:caption
//     //     //         image:imgs.toString("base64"),
//     // })
//   }
//   // const [dataimg,setdataimg] = useState([])
//   useEffect(() => {
//     // getp();
//     fetch("/api/posts")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data.posts);
//         // setCases(data.data.posts);
//         setallimgs(data.posts);
//       });
//   }, []);
//   return (
//     <>
//       <form onSubmit={handlesubmit}>
//         {/* <div> */}
//         Upload image:
//         <input
//           accept="image/"
//           type={"file"}
//           onChange={(e) => setImg(e)}
//         ></input>
//         <br />
//         Caption:
//         <input
//           type={"text"}
//           onChange={(e) => setCaption(e.target.value)}
//         ></input>
//         <input type={"submit"}></input>
//         {/* </div> */}
//       </form>
//       {/* <img src={imgs}></img> */}
//       <button onClick={uploadimage}>uploadimage</button>
//       {/* <Button></Button> */}
//       {/* {allimgs !="" || null ? ( <> */}
//       {allimgs.map((post) => {
//         return (
//           <div key={post._id}>
//             <img src={post.image}></img>
//             <p>{post.caption}</p>
//           </div>
//         );
//       })}
//       {/* </> ):(<></>)} */}
//       <Cp/>
//     </>
//   );
// }
