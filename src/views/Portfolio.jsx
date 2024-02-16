import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axiosClient from "../axios-client";
import '../components/styles/Portfolio.css';

export default function Portfolio() {
    let {id} = useParams();
    const storage =  `${import.meta.env.VITE_API_BASE_URL}/storage`;
    const [star, setStar] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getStar();
    }, [])

    const getStar = () => {
        setLoading(true)
        // console.log(`request sends by id: ${id}`)
        axiosClient.get(`/stars/${id}`)
        .then(({data}) => {
            setLoading(false)
            setStar(data);
            console.log(data);
        })
        .catch(() => {
            setLoading(false)
            console.log('fail')
        })
    }

    return (
        <body>
            <div className="about">
                <div className="about-main">
                    <div>
                        <img className="about-avatar" src={`${storage}/${star.biography_img}`} alt="avatar"/>
                        <img className="about-biography-img" src={`${storage}/${star.avatar}`} alt="biography"/>
                    </div>
                    <div className="about-name">
                        <span>{star.name}<br/>{star.surname}</span>
                    </div>
                    <span className="about-biography">{star.biography}</span>
                </div>
                <div className="about-description">

                </div>
            </div>
            <div className="products">

            </div>
            <div className="services">
                <div className="service">

                </div>
            </div>
        </body>
    )
}