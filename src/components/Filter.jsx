import styled from "styled-components";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import db from "../firebase";
import { setTrades } from "../features/tradeSlice";

const Filter = (props) => {
  const dispatch = useDispatch();
  const [simbol, setSimbol] = useState(null);
  const [type, setType] = useState(null);
  const [day, setDay] = useState(null);
  const [poi, setPoi] = useState([""]);
  let trades = [];

  // Cada vez que se añada alguna opcion nueva en el input, hay que actualizar también aquí
  // lo ideal seria crear un Slice para que se actualice automaticamente cada vez que haya
  // un cambio en las opciones del input
  const daysValues = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const poisValues = [
    "fomc",
    "pdsh",
    "lsh",
    "d1ob",
    "d1fvg",
    "h4fvg",
    "h1fvg",
    "15mfvg",
  ];

  // estos arrays lo ideal es tenerlo en un slice de readux
  const simbols = [
    { value: "xauusd", label: "XAUUSD" },
    { value: "eurusd", label: "EURUSD" },
    { value: "gbpusd", label: "GBPUSD" },
  ];
  const types = [
    { value: "buy", label: "BUY" },
    { value: "sell", label: "SELL" },
  ];
  const days = [
    { value: "monday", label: "MONDAY" },
    { value: "tuesday", label: "TUESDAY" },
    { value: "wednesday", label: "WEDNESDAY" },
    { value: "thursday", label: "THURSDAY" },
    { value: "friday", label: "FRIDAY" },
    { value: "empty", label: "----------" },
  ];

  const pois = [
    { value: "fomc", label: "FOMC" },
    { value: "pdsh", label: "PD-SH" },
    { value: "lsh", label: "LONDON-SH" },
    { value: "d1ob", label: "D1-OB" },
    { value: "d1fvg", label: "D1-FVG" },
    { value: "h4fvg", label: "H4-FVG" },
    { value: "h1fvg", label: "H1-FVG" },
    { value: "15mfvg", label: "15m-FVG" },
    { value: "empty", label: "----------" },
  ];

  const getSimbol = (value) => {
    setSimbol(value.value);
  };

  const getType = (value) => {
    setType(value.value);
  };

  const getDay = (value) => {
    setDay(value.value);
  };

  const getPoi = (value) => {
    setPoi(value.value);
  };

  useEffect(() => {
    //console.log(tags);
    const q = query(
      collection(db, "Trades"),
      where("simbol", "==", simbol),
      where("type", "==", type),
      // where("day", "==", day),
      where(
        "day",
        day === "empty" ? "in" : "==",
        day === "empty" ? daysValues : day
      ),
      where("poi", "==", poi)
      // where(
      //   "poi",
      //   poi === "empty" ? "in" : "==",
      //   poi === "empty" ? poisValues : poi
      // ),
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        trades = [...trades, { id: doc.id, ...doc.data() }];
      });
      dispatch(
        setTrades({
          trades: trades,
        })
      );
    });
  }, [simbol, type, day, poi]);

  return (
    <>
      <Container>
        <Wrap>
          <Selector>
            <Select
              onChange={getSimbol}
              options={simbols}
              placeholder="SIMBOL"
            />
          </Selector>
          <Selector>
            <Select onChange={getType} options={types} placeholder="BUY/SELL" />
          </Selector>
          <Selector>
            <Select onChange={getDay} options={days} placeholder="DAY" />
          </Selector>
          <Selector>
            <Select onChange={getPoi} options={pois} placeholder="POI" />
          </Selector>
        </Wrap>
      </Container>
    </>
  );
};

const Container = styled.div`
  //background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 27vh;
`;

const Wrap = styled.div`
  background-color: #c5e400;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  width: 60vw;
  border-radius: 30px;
  -webkit-box-shadow: 5px 5px 9px 0px rgba(0, 0, 0, 0.47);
  -moz-box-shadow: 5px 5px 9px 0px rgba(0, 0, 0, 0.47);
  box-shadow: 5px 5px 9px 0px rgba(246, 221, 2, 0.511);
  font-size: 14px;

  @media (max-width: 845px) {
    margin-top: 13em;
    height: 300px;
    width: 70vw;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const Selector = styled.div`
  width: 200px;

  @media (max-width: 1578px) {
    width: 150px;
  }

  @media (max-width: 1274px) {
    width: 100px;
  }

  @media (max-width: 845px) {
    width: 90%;
    padding: 10px;
  }
`;

export default Filter;
