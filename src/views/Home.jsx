import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import '../components/styles/Home.css';

export default function Home() {
    const [stars, setStars] = useState([]);
    const [loading, setLoading] = useState(false);
    const storage =  `${import.meta.env.VITE_API_BASE_URL}/storage`;

    useEffect(() => {
        getStars();
    }, [])

    const showImg = () => {
        var img = document.getElementById("name-img");
        img.style.visibility = "visible";
    };

    const hideImg = () => {
        var img = document.getElementById("name-img");
        img.style.visibility = "hidden";
    };

    const getStars = () => {
        setLoading(true)
        axiosClient.get('/stars')
        .then(({data}) => {
            setLoading(false)
            setStars(data);
            console.log(data);

            const container = document.getElementById('stars');
            const dataCount = data.length;
            const starsPerPage = 11;
            const threshold = dataCount - starsPerPage;
            const mid = Math.floor(dataCount / 2);

            const createStarContent = (i) => {
                const starContent = document.createElement('div');
                starContent.classList.add('name-row');
                starContent.innerHTML = `<a ${i == dataCount - 5 ? 'id="middle-of-page" ' : ' '}href='portfolio/${data[i].id}'>
                    ${data[i].name} ${data[i].surname}
                    <div class="name-img">
                        <img src="${storage}/${data[i].avatar}">
                    </div>
                    </a> <span class="num-row">${data[i].idx}</span>`;
                console.log(`${storage}/${data[i].avatar}`);
                return starContent;
            }

            for (let i = mid; i < dataCount; i++)
                container.appendChild(createStarContent(i));    

            for (let i = 0; i < mid; i++)
                container.appendChild(createStarContent(i));

            const pageHeight = document.body.scrollHeight;
            const pageWidth = document.body.scrollWidth;

            const handleScroll = () => {
                const firstIndex = Math.floor(window.scrollY / 55);
                const lastIndex = firstIndex + starsPerPage;

                if (firstIndex > threshold)
                    container.appendChild(container.firstElementChild);

                if(firstIndex <= threshold)
                    container.insertBefore(container.lastElementChild, container.firstElementChild);
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        })
        .then(() => {
            const middleOfPage = document.getElementById('middle-of-page');
            if (middleOfPage) {
                middleOfPage.scrollIntoView({ behavior: 'instant' });
            }
        })
        .catch(() => {
            setLoading(false)
            console.log('fail')
        })
    }

    return (
        <div>
            <div id='stars'></div>
        </div>
    )
}
