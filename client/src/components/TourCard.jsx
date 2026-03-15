import { Building2, Footprints, Goal, FilePenLine, Trash2 } from "lucide-react";
import Avtar from "./Avtar";
import PhotoViewer from "./PhotoViewer";
import { Link } from "react-router";


function TourCard({
    _id,
    title,
    description,
    cities,
    photos,
    user,
    startDate,
    endDate,
    createdAt,
    updatedAt,
    onDelete
}) {

    const { name, email } = user || {};
    return (
        <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-5 mb-6">
            <h2 className='text-xl playpen-sans'>{title}</h2>
            <p className='text-xs text-gray-500 playpen-sans'>{description}</p>
            <p className="my-2">
                <Building2 className="inline-block mr-1" />{" "}
                {cities.map((city) => {
                    return (
                        <span key={city} className="mr-2 text-sm bg-gray-300 px-4 py-0.5 rounded-full">
                            {city}
                        </span>
                    )
                })}
            </p>

            <p className="flex items-center my-2 text-sm">
                <Footprints className="mx-2 h-6 w-6" />Started on:{new Date(startDate).toLocaleDateString()}
                <Goal className="mx-4 h-6 w-6" />
                Ended on {new Date(endDate).toLocaleDateString()}

            </p>


            <div className="flex items-center">
                <span>Posterd by: <Avtar name={name} size="md" /><strong>{name}</strong></span>
            </div>

            <div className="flex">
                {photos.map((photo, index) => {
                    return (PhotoViewer({ imgUrl: photo, index })
                    )
                })
                }
            </div>
            <div className="absolute top-2 right-2 flex gap-3">
                <Link to={`/tours/${_id}/edit`}>
                    <FilePenLine className="h-6 w-6 cursor-pointer text-gray-700 hover:text-black" />
                </Link>

                <Trash2
                    className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => onDelete(_id)}
                />
            </div>

        </div>
    )
}

export default TourCard