import React from "react";
import "./Gig.scss";
import Slider from "infinite-react-carousel/lib/carousel/slider";
import { useParams } from "react-router-dom";
import person from "../../assets/person.png";
import { useState,useEffect } from "react";
import axios from "axios";

function Gig() {
  
  const {id} = useParams();
 
   const [data, setData] = useState({});
   const [dataUser, setDataUser] = useState({});
   const [isLoading, setisLoading] = useState(true);
   const [error, setError] = useState(false);
   const [isLoadingUser, setisLoadingUser] = useState(true);
    const [errorUser, setErrorUser] = useState(false);
    const [userID, setUserID] = useState();

  const fetchData = async () => {
    setError(false);
    setisLoading(true);
    try{
    const res = await axios.get(`http://localhost:8800/api/gigs/single/${id}`);
    setData(res.data);
    setUserID(res.data.userId);
    console.log("userId",userID)
     }catch(err){
      console.log("err",err);
       setError(true);
     }
     setisLoading(false);
  }
  

  const fetchUserData = async () => {
     setisLoadingUser(true);
     try{
    const res = await axios.get(`http://localhost:8800/api/users/${userID}`);
    setDataUser(res.data);
    console.log("res2",res.data);
     }
     catch(err){
       setErrorUser(true);
     }
     setisLoadingUser(false);
  }
  
  useEffect(() => {
    fetchData();
  }, [data]);
  
    useEffect(() => {
      fetchUserData();
    }, [userID]);
    //console.log("userId",data?.userId)
  // const id1 = data?.userId;
  // console.log("id1",data?.userId)

// const { isLoading:isLoadingUser, error:errorUser, data:dataUser } = useQuery({
//   queryKey: ["user"],
//   queryFn: () =>
//     newRequest.get(`/users/${id1}`).then((res) => {
//       return res.data;
//     }),
// });  
  const val = data?.images;
  return
  <>
  <div className="parent"></div>
  </>
  // return (
   
  //   <div className="gig">
  //     {isLoading ? (
  //       "loading..."
  //     ) : error ? (
  //       "Something went wrong"
  //     ) : (
  //       <div className="container">
  //         <div className="left">
  //           <span className="breadcrumbs">Earnup!! Graphics & Design </span>
  //           <h1>{data?.title}</h1>
  //           <div className="user">
  //             <img
  //               className="pp"
  //               src={person}
  //               alt=""
  //             />

  //             <span>Anna Bell</span>
  //             {!isNaN(data?.totalStars / data?.starNumber) && (
  //               <div className="stars">
  //                 {Array(Math.round(data?.totalStars / data?.starNumber))
  //                   .fill()
  //                   .map((item, i) => (
  //                     <img src="/img/star.png" alt="" />
  //                   ))}
  //                 <span>
  //                   {!isNaN(data?.totalStars / data?.starNumber) &&
  //                     Math.round(data?.totalStars / data?.starNumber)}
  //                 </span>
  //               </div>
  //             )}
  //           </div>
  //           <div className="slider">
  //             {data && (
  //               <Slider slidesToShow={1} arrowsScroll={1}>
  //                 {val && val?.map((image) => <img src={image} />)}
  //               </Slider>
  //             )}
  //           </div>

  //           <h2>About This Gig</h2>
  //           <p>{data?.desc}</p>
  //           { isLoading ? ("Loading") : error ? ("Something went Wrong") : 
  //             <div className="seller">
  //             <h2>About The Seller</h2>
  //             <div className="user">
  //               <img
  //                 src={person}
  //                 alt=""
  //               />
  //               <div className="info">
  //                 <span>Anna Bell</span>
  //                 {!isNaN(data?.totalStars / data?.starNumber) && (
  //                   <div className="stars">
  //                     {Array(Math.round(data?.totalStars / data?.starNumber))
  //                       .fill()
  //                       .map((item, i) => (
  //                         <img src="/img/star.png" alt="" />
  //                       ))}
  //                     <span>
  //                       {!isNaN(data?.totalStars / data?.starNumber) &&
  //                         Math.round(data?.totalStars / data?.starNumber)}
  //                     </span>
  //                   </div>
  //                 )}
  //                 <button>Contact Me</button>
  //               </div>
  //             </div>
  //             <div className="box">
  //               <div className="items">
  //                 <div className="item">
  //                   <span className="title">From</span>
  //                   <span className="desc">USA</span>
  //                 </div>
  //                 <div className="item">
  //                   <span className="title">Member since</span>
  //                   <span className="desc">Aug 2022</span>
  //                 </div>
  //                 <div className="item">
  //                   <span className="title">Avg. response time</span>
  //                   <span className="desc">4 hours</span>
  //                 </div>
  //                 <div className="item">
  //                   <span className="title">Last delivery</span>
  //                   <span className="desc">1 day</span>
  //                 </div>
  //                 <div className="item">
  //                   <span className="title">Languages</span>
  //                   <span className="desc">English</span>
  //                 </div>
  //               </div>
  //               <hr />
  //               <p>{data?.desc}</p>
  //             </div>
  //           </div>
  //           }
  //           <div className="reviews">
  //             <h2>Reviews</h2>
  //             <div className="item">
  //               <div className="user">
  //                 <img
  //                   className="pp"
  //                   src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
  //                   alt=""
  //                 />
  //                 <div className="info">
  //                   <span>Garner David</span>
  //                   <div className="country">
  //                     <img
  //                       src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
  //                       alt=""
  //                     />
  //                     <span>United States</span>
  //                   </div>
  //                 </div>
  //               </div>
  //               {!isNaN(data?.totalStars / data?.starNumber) && (
  //                 <div className="stars">
  //                   {Array(Math.round(data?.totalStars / data?.starNumber))
  //                     .fill()
  //                     .map((item, i) => (
  //                       <img src="/img/star.png" alt="" />
  //                     ))}
  //                   <span>
  //                     {!isNaN(data?.totalStars / data?.starNumber) &&
  //                       Math.round(data?.totalStars / data?.starNumber)}
  //                   </span>
  //                 </div>
  //               )}
  //               <p>
  //                 I just want to say that art_with_ai was the first, and after
  //                 this, the only artist Ill be using on Fiverr. Communication
  //                 was amazing, each and every day he sent me images that I was
  //                 free to request changes to. They listened, understood, and
  //                 delivered above and beyond my expectations. I absolutely
  //                 recommend this gig, and know already that Ill be using it
  //                 again very very soon
  //               </p>
  //               <div className="helpful">
  //                 <span>Helpful?</span>
  //                 <img src="/img/like.png" alt="" />
  //                 <span>Yes</span>
  //                 <img src="/img/dislike.png" alt="" />
  //                 <span>No</span>
  //               </div>
  //             </div>
  //             <hr />
  //             <div className="item">
  //               <div className="user">
  //                 <img
  //                   className="pp"
  //                   src="https://images.pexels.com/photos/4124367/pexels-photo-4124367.jpeg?auto=compress&cs=tinysrgb&w=1600"
  //                   alt=""
  //                 />
  //                 <div className="info">
  //                   <span>Sidney Owen</span>
  //                   <div className="country">
  //                     <img
  //                       src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png"
  //                       alt=""
  //                     />
  //                     <span>Germany</span>
  //                   </div>
  //                 </div>
  //               </div>
  //               {!isNaN(data?.totalStars / data?.starNumber) && (
  //                 <div className="stars">
  //                   <img src="/img/star.png" alt="" />
  //                   <img src="/img/star.png" alt="" />
  //                   <img src="/img/star.png" alt="" />
  //                   <img src="/img/star.png" alt="" />
  //                   <img src="/img/star.png" alt="" />
  //                   <span>
  //                     {!isNaN(data?.totalStars / data?.starNumber) &&
  //                       Math.round(data?.totalStars / data?.starNumber)}
  //                   </span>
  //                 </div>
  //               )}
  //               <p>
  //                 The designer took my photo for my book cover to the next
  //                 level! Professionalism and ease of working with designer along
  //                 with punctuality is above industry standards!! Whatever your
  //                 project is, you need this designer!
  //               </p>
  //               <div className="helpful">
  //                 <span>Helpful?</span>
  //                 <img src="/img/like.png" alt="" />
  //                 <span>Yes</span>
  //                 <img src="/img/dislike.png" alt="" />
  //                 <span>No</span>
  //               </div>
  //             </div>
  //             <hr />
  //             <div className="item">
  //               <div className="user">
  //                 <img
  //                   className="pp"
  //                   src="https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1600"
  //                   alt=""
  //                 />
  //                 <div className="info">
  //                   <span>Lyle Giles </span>
  //                   <div className="country">
  //                     <img
  //                       src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
  //                       alt=""
  //                     />
  //                     <span>United States</span>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="stars">
  //                 <img src="/img/star.png" alt="" />
  //                 <img src="/img/star.png" alt="" />
  //                 <img src="/img/star.png" alt="" />
  //                 <img src="/img/star.png" alt="" />
  //                 <img src="/img/star.png" alt="" />
  //                 <span>5</span>
  //               </div>
  //               <p>
  //                 Amazing work! Communication was amazing, each and every day he
  //                 sent me images that I was free to request changes to. They
  //                 listened, understood, and delivered above and beyond my
  //                 expectations. I absolutely recommend this gig, and know
  //                 already that Ill be using it again very very soon
  //               </p>
  //               <div className="helpful">
  //                 <span>Helpful?</span>
  //                 <img src="/img/like.png" alt="" />
  //                 <span>Yes</span>
  //                 <img src="/img/dislike.png" alt="" />
  //                 <span>No</span>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="right">
  //           <div className="price">
  //             <h3>{data?.shortTitle}</h3>
  //             <h2>${data?.price}</h2>
  //           </div>
  //           <p>{data?.shortDesc}</p>
  //           <div className="details">
  //             <div className="item">
  //               <img src="/img/clock.png" alt="" />
  //               <span>{data?.deliveryTime} Days Delivery</span>
  //             </div>
  //             <div className="item">
  //               <img src="/img/recycle.png" alt="" />
  //               <span>{data?.revisionNumber} Revisions</span>
  //             </div>
  //           </div>
  //           <div className="features">
  //             {data?.features.map((item) => (
  //               <div className="item" key={item}>
  //                 <img src="/img/greencheck.png" alt="" />
  //                 <span>{item}</span>
  //               </div>
  //             ))}
  //           </div>
  //           <button>Continue</button>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
  
}

export default Gig;