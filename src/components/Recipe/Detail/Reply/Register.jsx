import useUserStore from "@zustand/userStore.mjs";
import styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useCustomAxios from "@hooks/useCustomAxios.mjs";

function ReplyRegister({ rcpName, rcpNum, setRepliesFn }) {
  const { replyRegister } = styles;
  const { user } = useUserStore();
  const axios = useCustomAxios();

  // console.log(user, replies);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      formData = {
        ...formData,
        type: "qna",
        product_id: rcpNum,
        title: `${rcpName} 후기`,
        // "image": "sample-bugatti.png",
        extra: {
          rating: formData.rating,
        },
      };
      const { data } = await axios.post("/posts", formData);
      const resPost = await axios.get(
        `/posts?type=qna&custom={"product_id": ${rcpNum}}`
      );
      setRepliesFn(resPost.data);
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  return (
    <div className={replyRegister}>
      {user ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <img src={user.profile} alt={user.name} />
          {user.name}
          <div>
            <input
              type="radio"
              name="rating"
              value="1"
              {...register("rating", {
                required: "별점을 등록하세요",
              })}
            />
            <input
              type="radio"
              name="rating"
              value="2"
              {...register("rating", {
                required: "별점을 등록하세요",
              })}
            />
            <input
              type="radio"
              name="rating"
              value="3"
              {...register("rating", {
                required: "별점을 등록하세요",
              })}
            />
            <input
              type="radio"
              name="rating"
              value="4"
              {...register("rating", {
                required: "별점을 등록하세요",
              })}
            />
            <input
              type="radio"
              name="rating"
              value="5"
              {...register("rating", {
                required: "별점을 등록하세요",
              })}
            />
            {errors && <div>{errors.rating?.message}</div>}
          </div>
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            {...register("content", {
              required: "내용을 입력하세요.",
              minLength: {
                value: 5,
                message: "5자 이상 입력해주세요.",
              },
            })}
          ></textarea>
          {errors && <div>{errors.content?.message}</div>}
          <button>등록하기</button>
        </form>
      ) : (
        <p>
          <Link to="/user/login">로그인</Link> 후 후기를 작성해보세요.
        </p>
      )}
    </div>
  );
}

export default ReplyRegister;
