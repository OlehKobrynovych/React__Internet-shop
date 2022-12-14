import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './UserAnalyticsView.css';
import deleteImg from '../../assets/images/deleteImg.svg';
import editIcon from './../../assets/images/editIcon.svg';
import noPhotos from '../../assets/images/noPhotos.svg';

import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { setEditProduct, setRemoveProduct } from '../../store/userSlice';
import { toast } from 'react-toastify';
import ModalWindow from '../../components/ModalWindow/ModalWindow';

function UserAnalyticsView() {
    const selectedLanguage = useSelector(state => state.userSlice.selectedLanguage);
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const userAnalyticsCtx = useRef(null);
    const [vw, setVw] = useState(window.innerWidth);
    const [isModalDelProduct, setIsModalDelProduct] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // let { userId } = useParams();


    // --------------------------------------------------
    let orderedProducts = [
      {_id: "636a942156d16c168f514cfc", shop_id:"6333055e19047777b333e42e", category_id:"633325415114eb6475794c8b", name:"sdfs", price:"1", new_price:null, images:[], details:"", colors:[], sizes:[]}
    ]

    const data = {
        labels: [
          'В процесі',
          'Виконано',
          'Відхилено'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            '#007aff36',
            'rgb(7 158 27 / 25%)',
            '#e72f0b3b'
          ],
          hoverOffset: 4
        }]
      };
    
      const configOrderStatus = {
        type: 'pie',
        data: data,
      };


    //   {
    //       shop_id: '21212121',
    //       visitors: [
    //           {
    //             moon: '1',  //від 1 до 12
    //             days: [
    //                 {day: 1, quantity: 15},   // дені і кількість відвідувачів
    //                 {day: 2, quantity: 15},
    //                 // ................//
    //                 {day: 30, quantity: 55},
    //                 {day: 31, quantity: 5},
    //             ]
    //           }
    //       ],
    //       top_products: [id1, id2, id3],  // топ 10 товарів
    //       purchases: [
    //           {
    //             moon: '1',  //від 1 до 12
    //             data:  {
    //                 total_purchases: 450,
    //                 inProcess: 350,
    //                 done: 50,
    //                 rejected: 50,
    //               }
    //           }
    //       ]
    //     }

      // const labels = Utils.months({count: 7});


      // ------------------------------------------------------------
      let res = [
        {day: 1, visitors: 65},
        {day: 2, visitors: 65},
        {day: 3, visitors: 55},
        {day: 4, visitors: 85},
        {day: 5, visitors: 65},
        {day: 6, visitors: 645},
        {day: 7, visitors: 6},
        {day: 8, visitors: 65},
        {day: 9, visitors: 5},
        {day: 10, visitors: 65},
        {day: 11, visitors: 25},
        {day: 12, visitors: 65},
        {day: 13, visitors: 65},
        {day: 14, visitors: 25},
        {day: 15, visitors: 65},
        {day: 16, visitors: 65},
        {day: 17, visitors: 5},
        {day: 18, visitors: 265},
        {day: 19, visitors: 65},
        {day: 20, visitors: 65},
        {day: 21, visitors: 65},
        {day: 22, visitors: 65},
        {day: 23, visitors: 65},
        {day: 24, visitors: 65},
        {day: 25, visitors: 65},
        {day: 26, visitors: 65},
        {day: 27, visitors: 65},
        {day: 28, visitors: 65},
        {day: 29, visitors: 65},
        {day: 30, visitors: 65},
        {day: 31, visitors: 65},
      ]
      const data2 = {
        // labels: labels,
        labels: ['Число 1', 'Число 2', 'Число 3', 'Число 4', 'Число 5', 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        datasets: [{
          label: 'Відвідувачі',
          data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 56, 55, 40, 81, 56, 55, 40, 56, 55, 40,],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1
        }]
      };

      const configVisitors = {
        type: 'bar',
        data: data2,
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      };

    //   console.log(shop)


    // -------------------------------------------------
    let res2 = [
      {moon: 1, allOrder: 92, inProcess: 40, done: 42, rejected: 10 },
      {moon: 2, allOrder: 95, inProcess: 40, done: 42, rejected: 10 },
      {moon: 3, allOrder: 102, inProcess: 40, done: 42, rejected: 10 },
      {moon: 4, allOrder: 92, inProcess: 40, done: 42, rejected: 10 },
      {moon: 5, allOrder: 96, inProcess: 40, done: 42, rejected: 10 },
      {moon: 6, allOrder: 92, inProcess: 40, done: 42, rejected: 10 },
      {moon: 7, allOrder: 0, inProcess: 0, done: 0, rejected: 0 },
      {moon: 8, allOrder: 0, inProcess: 0, done: 0, rejected: 0 },
      {moon: 9, allOrder: 0, inProcess: 0, done: 0, rejected: 0 },
      {moon: 10, allOrder: 0, inProcess: 0, done: 0, rejected: 0 },
      {moon: 11, allOrder: 0, inProcess: 0, done: 0, rejected: 0 },
      {moon: 12, allOrder: 0, inProcess: 0, done: 0, rejected: 0 },
    ]

    let barChartData = {
      labels: [
        "Січень",
        "Лютий",
        "Березень",
        "Квітень",
        "Травень",
        "Червень",
        "Липень",
        "Серпень",
        "Вересень",
        "Жовтень",
        "Листопад",
        "Грудень",
      ],
      datasets: [
        {
          label: "Всіх",
          backgroundColor: "yellow",
          borderColor: "orange",
          borderWidth: 1,
          data: [60,70,70,30,70,70,40,60]
        },
        {
          label: "В процесі",
          backgroundColor: "lightblue",
          borderColor: "blue",
          borderWidth: 1,
          data: [20, 25, 30, 10, 10, 7, 5, 10]
        },
        {
          label: "Виконаних",
          backgroundColor: "lightgreen",
          borderColor: "green",
          borderWidth: 1,
          data: [30, 30, 20, 60, 25, 27 ,30,10]
        },
        {
          label: "Відхилених",
          backgroundColor: "pink",
          borderColor: "red",
          borderWidth: 1,
          data: [3, 5, 10, 15, 13, 5, 6, 7]
        },
      ]
    };
    
    let chartOptions = {
      // responsive: true,
      legend: {
        position: "top"
      },
      // indexAxis: 'y',
      maintainAspectRatio: false,
      // aspectRatio: vw < 500 ? 1 / 1 : 2 / 1,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
    
    useEffect(() => {
      const completedOrder = new Chart(
        document.getElementById('userAnalyticsCompletedOrdersGraph'),
        {
          type: "bar",
          data: barChartData,
          options: chartOptions
        }
      );

      const orderStatus = new Chart(
        document.getElementById('userAnalyticsOrderStatusGraph'),
        configOrderStatus
      );
      
      const visitors = new Chart(
        document.getElementById('userAnalyticsVisitorsGraph'),
        configVisitors
      );

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, [])

    function handleResize() {
        setVw(window.innerWidth)
    }
   
    function handleEditProduct(obj) {
        dispatch(setEditProduct(obj))
        localStorage.setItem('editProduct', JSON.stringify(obj));
        navigate(`/auth/${user._id}/product/create`)
    }
 
    const handleDeleteProduct = (id) => {
        setIsModalDelProduct(true)
        setDeleteId(id)
    }

    const handleIsDeleteProduct = (boolean) => {
        if (boolean) {
            const data = {
                token: user.token,
            }
    
            fetch(`${process.env.REACT_APP_BASE_URL}/products/${deleteId}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        console.log('del UserAnalytics', res)
                        dispatch(setRemoveProduct(deleteId))
                        toast.success('Товар видалено', {
                            position: "bottom-right",
                            autoClose: 2500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        })
                    } else {
                        console.log('DELETE UserAnalytics', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    toast.error('Сталася помилка', {
                        position: "bottom-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
        }

        setIsModalDelProduct(false)
        setDeleteId('')
    }

    return (
        <div className="user-analytics">

            {
                isModalDelProduct && <ModalWindow title={"Ви впевнені"}  text={"Видалити даний товар?"} handleClick={handleIsDeleteProduct} leftBtn={"Ні"} rightBtn={"Так"}/>
            }

            <div className="user-analytics--wrpa container">
                <h3 className="user-analytics__title">Ляскаво просимо {user.first_name} {user.last_name}</h3>
                <NavLink className="user-analytics__shop-btn" to={`/${shop?.name ? shop.name : `auth/${user?._id}/shop`}`}>{shop?.name ? 'Перейти до магазину' : 'Створити магазин'}</NavLink>
            
                <div className="user-analytics__completed-wrap">
                    <h4 className="user-analytics__completed-title">Графік виконаних замовлень</h4>
                    <div className="user-analytics__completed-sub-title">Рік: 2022р</div>
                    <div className="user-analytics__completed">
                        <div className="user-analytics__completed-graph">
                            {/* <canvas  className="user-analytics__completed-graph-canvas" id="userAnalyticsCompletedOrdersGraph"></canvas> */}
                            <canvas id="userAnalyticsCompletedOrdersGraph"></canvas>
                        </div>
                        <div className="user-analytics__completed-tabl">
                          {
                            res2.map(el => (<div className="user-analytics__completed-tabl-item" key={el.moon}>
                              <div className="user-analytics__completed-tabl-item-info"><b>Місяць</b> {el.moon}</div> 
                              <div className="user-analytics__completed-tabl-item-info"><b>всіх:</b> {el.allOrder}</div> 
                              <div className="user-analytics__completed-tabl-item-info"><b>в процесі:</b> {el.inProcess}</div> 
                              <div className="user-analytics__completed-tabl-item-info"><b>виконаних:</b> {el.done}</div> 
                              <div className="user-analytics__completed-tabl-item-info"><b>відхилених:</b> {el.rejected} </div> 
                            </div>))
                          }
                        </div>
                    </div>
                </div>

                <div className="user-analytics__order-status-wrap">
                    <h4 className="user-analytics__order-status-title">Графік статусів замовлень</h4>
                    <h3 className="user-analytics__order-status-sub-title">Місяць: Листопад 2022р</h3>
                    <div className="user-analytics__order-status">
                        <div className="user-analytics__order-status-info">
                            <div className="user-analytics__order-status-info-title">Всіх замовлень: 450</div>
                            <div className="user-analytics__order-status-info-title">В процесі: 300</div>
                            <div className="user-analytics__order-status-info-title">Виконано: 50</div>
                            <div className="user-analytics__order-status-info-title">Відхилено: 100</div>
                        </div>
                        <div className="user-analytics__order-status-graph">
                            <canvas id="userAnalyticsOrderStatusGraph"></canvas>
                        </div>
                    </div>
                </div>
                
                <div className="user-analytics__visitors-wrap">
                    <h4 className="user-analytics__visitors-title">Графік кількості відвідувачів</h4>
                    <div className="user-analytics__visitors">
                        <div className="user-analytics__visitors-info">
                            <div className="user-analytics__visitors-info-title">Місяць: Листопад 2022р</div>
                        </div>
                        <div className="user-analytics__visitors-graph">
                            <canvas id="userAnalyticsVisitorsGraph"></canvas>
                        </div>
                        <div className="user-analytics__visitors-tabl">
                          {
                            res.map(el => (<div className="user-analytics__visitors-tabl-item" key={el.day}>
                              Число {el.day} відвідувачів {el.visitors}
                            </div>))
                          }
                        </div>
                    </div>
                </div>

                <div>
                  {
                    !!orderedProducts.length && <div className="user-analytics__top-product">
                        <h4 className="user-analytics__top-product-title">Товари які найчастіше замовляють</h4>
                        <Swiper
                            slidesPerView={vw > 500 ? vw > 768 ? 3 : 2 : 1}
                            spaceBetween={30}
                            slidesPerGroup={vw > 500 ? vw > 768 ? 3 : 2 : 1}
                            loop={true}
                            loopFillGroupWithBlank={true}
                            pagination={{
                            clickable: true,
                            }}
                            navigation={true}
                            initialSlide='1'
                            modules={[Navigation]}
                            className="mySwiper user-analytics__top-product-swiper-wrap"
                        >
                            {
                                orderedProducts.map(el => (
                                    <SwiperSlide key={el._id}>
                                        <div className='user-analytics__top-product-card' key={el._id}>
                                            <div className='user-analytics__top-product-card-wrap'>
                                                <div className="user-analytics__top-product-card-swiper-wrap">
                                                    <Swiper
                                                        pagination={{
                                                            type: "fraction",
                                                        }}
                                                        navigation={true}
                                                        modules={[ Navigation]}
                                                        className="mySwiper"
                                                        >
                                                        {
                                                            !!el?.images?.length ? el?.images.map(image => <SwiperSlide key={image}><img className="user-analytics__top-product-card-swiper-img" src={image} alt='img'/></SwiperSlide>)
                                                            : <img className="user-analytics__top-product-card-swiper-img-none" src={noPhotos} alt='img'/> 
                                                        }
                                                    </Swiper>
                                                </div>
                                                <div className='user-analytics__top-product-card-info'>
                                                    <div className='user-analytics__top-product-card-info-title-wrap'>
                                                        <span className='user-analytics__top-product-card-info-title'>{selectedLanguage?.userProduct?.userProductCardName}</span>
                                                        <span className='user-analytics__top-product-card-info-text'>&nbsp;{el.name}</span>
                                                    </div>
                                                    <div className='user-analytics__top-product-card-info-title-wrap'>
                                                        <span className='user-analytics__top-product-card-info-title'>{selectedLanguage?.userProduct?.userProductCardCategory}</span>
                                                        <span className='user-analytics__top-product-card-info-text'>&nbsp;{el.category_name}</span>
                                                    </div>
                                                    <div className='user-analytics__top-product-card-info-title-wrap'>
                                                        <span className='user-analytics__top-product-card-info-title'>{selectedLanguage?.userProduct?.userProductCardPrice}</span>
                                                        <span className='user-analytics__top-product-card-info-text'>&nbsp;{el.price}{shop?.currency}</span>
                                                    </div>
                                                    <div className='user-analytics__top-product-card-info-title-wrap'>
                                                        <span className='user-analytics__top-product-card-info-title'>{selectedLanguage?.userProduct?.userProductCardNewPrice}</span>
                                                        <span className='user-analytics__top-product-card-info-text user-analytics__top-product-card-info-text-red'>&nbsp;{el.new_price}{shop?.currency}</span>
                                                    </div>
                                                    <div className='user-analytics__top-product-card-info-title-wrap'>
                                                        <span className='user-analytics__top-product-card-info-title'>{selectedLanguage?.userProduct?.userProductCardColors}</span>
                                                        <span className='user-analytics__top-product-card-info-text'>&nbsp;{el.colors.join(', ')}</span>
                                                    </div>
                                                    <div className='user-analytics__top-product-card-info-title-wrap'>
                                                        <span className='user-analytics__top-product-card-info-title'>{selectedLanguage?.userProduct?.userProductCardSizes}</span>
                                                        <span className='user-analytics__top-product-card-info-text'>&nbsp;{el.sizes.join(', ')}</span>
                                                    </div>
                                                    <span className='user-analytics__top-product-card-info-title'>{selectedLanguage?.userProduct?.userProductCardDescription}</span>
                                                    <div className='user-analytics__top-product-card-info-details'>{el.details}</div>
                                                </div>
                                            </div>

                                            <div className='user-analytics__top-product-card-btn-wrap'>
                                                <img className='user-analytics__top-product-card-btn' onClick={() => handleEditProduct(el)} src={editIcon} alt='img'/>
                                                <img className='user-analytics__top-product-card-btn' onClick={() => handleDeleteProduct(el._id)} src={deleteImg} alt='img'/>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                  }
                </div>
            </div>
        </div>
    );
}

export default UserAnalyticsView;