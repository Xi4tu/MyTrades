import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTrades } from "../features/tradeSlice";

const Content = (props) => {
  const trades = useSelector(selectTrades);
  return (
    <Container>
      {trades &&
        trades.map((trade, key) => (
          <Wrapper key={key}>
            {trade.id}
            <Link to={`/detail/` + trade.id} target="_blank">
              <img src={trade.frontImg} alt={trade.simbol} />
            </Link>
          </Wrapper>
        ))}
    </Container>
  );
};

const Container = styled.main`
  //background-color: #9b6464;
  height: 100%;
  padding: 0 70px 100px 70px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 40px;
  row-gap: 30px;

  @media (max-width: 1172px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 845px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    margin-top: 12em;
  }
`;

const Wrapper = styled.div`
  //background-color: #969696;
  min-height: 200px;
  min-width: 200px;
  height: 60px;
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 0;
    top: 0;
    border-radius: 10px;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: #c5e400;
    img {
      opacity: 0.8;
    }
  }
`;

export default Content;
