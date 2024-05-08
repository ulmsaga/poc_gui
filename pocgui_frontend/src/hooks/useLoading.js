import { startLoad, endLoad } from "store/reducers/loading";
import { useDispatch } from "react-redux";

const useLoading = () => {
  const dispatch = useDispatch();

  const onLoad = () => {
    dispatch(startLoad());
  }
  const offLoad = () => {
    dispatch(endLoad());
  }

  return {
    onLoad, offLoad
  }
};

export default useLoading;