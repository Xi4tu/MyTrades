import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import db from "../firebase";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";

const Detail = (props) => {
  const { id } = useParams();
  const [details, setDetailData] = useState({});
  useEffect(() => {
    onSnapshot(query(collection(db, "Trades")), (querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        if (doc.exists && doc.id === id) {
          setDetailData(doc.data());
        } else {
          console.log("⚠️Error in getting details from database");
        }
      });
    });
  }, [id]);

  return (
    <Container>
      <Wrap>
        <ImgSlider id={id} details={details} />
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow-x: hidden;
`;

const Wrap = styled.div`
  height: 70vh;
  width: 80%;
  display: block;
`;

export default Detail;
