import { Building2, Footprints, Goal, FilePenLine, Trash2, Heart } from "lucide-react";
import Avtar from "./Avtar";
import PhotoViewer from "./PhotoViewer";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { getuserJwtToken } from "../utils";

function TourCard({
    _id,
    title,
    description,
    cities,
    photos,
    user,
    startDate,
    endDate,
    onDelete
}) {

    const [isWishlisted, setIsWishlisted] = useState(false);
    const token = getuserJwtToken();

    const checkWishlist = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/wishlist`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const exists = res.data.data.some(item => item._id === _id);
            setIsWishlisted(exists);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        checkWishlist();
    }, [_id]);

    const toggleWishlist = async () => {
        try {
            if (isWishlisted) {
                await axios.delete(
                    `${import.meta.env.VITE_API_BASE_URL}/wishlist/${_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setIsWishlisted(false);
            } else {
                await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/wishlist/${_id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setIsWishlisted(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const { name } = user || {};

    return (
        <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-5 mb-6">

            <Heart
                onClick={toggleWishlist}
                size={28}
                className={`absolute top-3 right-3 cursor-pointer transition ${
                    isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"
                }`}
            />

            <h2 className='text-xl playpen-sans'>{title}</h2>
            <p className='text-xs text-gray-500 playpen-sans'>{description}</p>

            <p className="my-2">
                <Building2 className="inline-block mr-1" />
                {cities.map((city) => (
                    <span key={city} className="mr-2 text-sm bg-gray-300 px-4 py-0.5 rounded-full">
                        {city}
                    </span>
                ))}
            </p>

            <p className="flex items-center my-2 text-sm">
                <Footprints className="mx-2 h-6 w-6" />
                Started: {new Date(startDate).toLocaleDateString()}
                <Goal className="mx-4 h-6 w-6" />
                Ended: {new Date(endDate).toLocaleDateString()}
            </p>

            <div className="flex items-center gap-2">
                Posted by:
                <strong>{name}</strong>
                <Avtar name={name} size="md" />
            </div>

            <div className="flex">
                {photos.map((photo, index) => (
                    <PhotoViewer key={index} imgUrl={photo} index={index} />
                ))}
            </div>

            <div className="absolute top-2 right-12 flex gap-3">
                <Link to={`/tours/${_id}/edit`}>
                    <FilePenLine className="h-6 w-6 cursor-pointer text-gray-700 hover:text-black" />
                </Link>

                <Trash2
                    className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => onDelete(_id)}
                />
            </div>

        </div>
    );
}

export default TourCard;