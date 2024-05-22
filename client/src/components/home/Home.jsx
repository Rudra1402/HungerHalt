import React, { useState, useEffect } from 'react'
import fightfoodwaste from '../../assets/images/fightfoodwaste.png'
import Toast from '../../custom/CustomToast';
import 'react-toastify/dist/ReactToastify.css';
import { predictHandler } from '../../apis/predictApis';
import CustomLoader from '../../custom/CustomLoader';
import hh from "../../assets/images/hungerhalt2.png"
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';

function Home() {
    const [typeOfFood, setTypeOfFood] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState("0");
    const [eventType, setEventType] = useState("");
    const [foodQuantity, setFoodQuantity] = useState("0");
    const [storageConditions, setStorageConditions] = useState("");
    const [purchaseHistory, setPurchaseHistory] = useState("");
    const [seasonality, setSeasonality] = useState("");
    const [preparationMethod, setPreparationMethod] = useState("");
    const [geoLocation, setGeoLocation] = useState("");
    const [pricing, setPricing] = useState("");

    const [isValuePredicted, setIsValuePredicted] = useState(false);
    const [wastePrediction, setWastePrediction] = useState(null);

    const predictionApiHandler = () => {
        setWastePrediction(null)
        setIsValuePredicted(true)

        if (typeOfFood == "") {
            console.log("Type of Food cannot be empty!")
            return;
        }
        if (parseInt(numberOfGuests) < 1) {
            console.log("Number of Guests cannot be 0 or less!")
            return;
        }
        if (eventType == "") {
            console.log("Type of Event cannot be empty!")
            return;
        }
        if (parseInt(foodQuantity) < 1) {
            console.log("Quantity of Food cannot be 0 or less!")
            return;
        }
        if (storageConditions == "") {
            console.log("Storage Conditions cannot be empty!")
            return;
        }
        if (purchaseHistory == "") {
            console.log("Purchase History cannot be empty!")
            return;
        }
        if (seasonality == "") {
            console.log("Seasonality cannot be empty!")
            return;
        }
        if (preparationMethod == "") {
            console.log("Preparation Method cannot be empty!")
            return;
        }
        if (geoLocation == "") {
            console.log("Geographical Location cannot be empty!")
            return;
        }
        if (pricing == "") {
            console.log("Pricing cannot be empty!")
            return;
        }

        const payload = {
            type_of_food: typeOfFood,
            number_of_guests: numberOfGuests,
            event_type: eventType,
            quantity_of_food: foodQuantity,
            storage_conditions: storageConditions,
            purchase_history: purchaseHistory,
            seasonality: seasonality,
            preparation_method: preparationMethod,
            geographical_location: geoLocation,
            pricing: pricing
        }

        predictHandler(payload, setWastePrediction, setIsValuePredicted)
    }

    useEffect(() => {
        document.title = "HungerHalt / Home"
    }, [])

    return (
        <div className='h-[calc(100% - 64px)] overflow-y-auto w-full flex flex-col gap-0 items-center text-gray-100'
            style={{ scrollbarWidth: "none" }}
        >
            <div
                className='flex flex-col w-full gap-4 overflow-y-auto items-center p-3'
                style={{ scrollbarWidth: "none" }}
            >
                <div
                    className='min-h-full w-2/3 flex flex-col gap-12 items-center justify-center border border-purple-700 rounded-md p-4'
                    style={{ scrollbarWidth: "none" }}
                >
                    <div className='flex flex-col gap-8 items-center'>
                        {/* <div className='text-5xl leading-none tracking-wide font-medium'>
                        HungerHalt
                    </div> */}
                        <img
                            src={hh}
                            alt="HungerHalt"
                            className='h-36 w-auto rounded-md'
                            loading='lazy'
                        />
                        <div className='text-xl leading-none tracking-wide'>
                            Rescuing Leftovers, Reviving Communities
                        </div>
                        <div className='flex items-center gap-x-4'>
                            <Link
                                to={'/feed'}
                                className='px-5 py-2.5 rounded-md cursor-pointer text-lg leading-none border border-gray-600 hover-btn'>View Feed</Link>
                            <button className='px-6 py-3 rounded-md cursor-pointer text-lg leading-none border border-gray-600 hover-btn'>View Items</button>
                        </div>
                    </div>
                </div>
                <div
                    className='h-fit w-2/3 flex flex-col items-center justify-start gap-6 border border-purple-700 rounded-md p-4'
                    style={{ scrollbarWidth: "none" }}
                >
                    <div className='text-2xl underline underline-offset-8'>Wastage Prediction AI</div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-x-5 justify-center'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='text-gray-400'>Type of Food</div>
                                <select
                                    id="foodtype"
                                    name="foodtype"
                                    value={typeOfFood}
                                    onChange={e => setTypeOfFood(e.target.value)}
                                    className='w-64 h-12 p-2 rounded-md text-gray-800 text-lg leading-none'
                                >
                                    <option value="">Select</option>
                                    <option value="Meat">Meat</option>
                                    <option value="Vegetables">Vegetables</option>
                                    <option value="Fruits">Fruits</option>
                                    <option value="Baked Goods">Baked Goods</option>
                                    <option value="Dairy Products">Dairy Products</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='text-gray-400'>Number of Guests</div>
                                <input
                                    id="guestsnumber"
                                    name="guestsnumber"
                                    type={'number'}
                                    value={numberOfGuests}
                                    placeholder='Number of guests'
                                    onChange={e => setNumberOfGuests(e.target.value)}
                                    className='w-64 h-12 p-2 rounded-md text-gray-800 text-lg leading-none'
                                />
                            </div>
                        </div>
                        <div className='flex items-center gap-x-5 justify-center'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='text-gray-400'>Type of Event</div>
                                <select
                                    id="eventtype"
                                    name="eventtype"
                                    value={eventType}
                                    onChange={e => setEventType(e.target.value)}
                                    className='w-64 h-12 p-2 rounded-md text-gray-800 text-lg leading-none'
                                >
                                    <option value="">Select</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Birthday">Birthday</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Social Gathering">Social Gathering</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='text-gray-400'>Quantity of Food</div>
                                <input
                                    id="foodquantity"
                                    name="foodquantity"
                                    type={'number'}
                                    value={foodQuantity}
                                    placeholder='Quantity of Food'
                                    onChange={e => setFoodQuantity(e.target.value)}
                                    className='w-64 h-12 p-2 rounded-md text-gray-800 text-lg leading-none'
                                />
                            </div>
                        </div>
                        <div className='flex items-center gap-x-5 justify-center'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='text-gray-400'>Storage Conditions</div>
                                <select
                                    id="storageconditions"
                                    name="storageconditions"
                                    value={storageConditions}
                                    onChange={e => setStorageConditions(e.target.value)}
                                    className='w-64 h-12 p-2 rounded-md text-gray-800 text-lg leading-none'
                                >
                                    <option value="">Select</option>
                                    <option value="Room Temperature">Room Temperature</option>
                                    <option value="Refrigerated">Refrigerated</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='text-gray-400'>Purchase History</div>
                                <select
                                    id="purchasehistory"
                                    name="purchasehistory"
                                    value={purchaseHistory}
                                    onChange={e => setPurchaseHistory(e.target.value)}
                                    className='w-64 h-12 p-2 rounded-md text-gray-800 text-lg leading-none'
                                >
                                    <option value="">Select</option>
                                    <option value="Regular">Regular</option>
                                    <option value="Occasional">Occasional</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex items-center gap-x-5 justify-center'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='text-gray-400'>Seasonality</div>
                                <select
                                    id="seasonality"
                                    name="seasonality"
                                    value={seasonality}
                                    onChange={e => setSeasonality(e.target.value)}
                                    className='w-64 h-12 p-2 rounded-md text-gray-800 text-lg leading-none'
                                >
                                    <option value="">Select</option>
                                    <option value="All Seasons">All Seasons</option>
                                    <option value="Summer">Summer</option>
                                    <option value="Winter">Winter</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='text-gray-400'>Preparation Method</div>
                                <select
                                    id="preparationmethod"
                                    name="preparationmethod"
                                    value={preparationMethod}
                                    onChange={e => setPreparationMethod(e.target.value)}
                                    className='w-64 h-12 p-2 rounded-md text-gray-800 text-lg leading-none'
                                >
                                    <option value="">Select</option>
                                    <option value="Sit-down Dinner">Sit-down Dinner</option>
                                    <option value="Finger Food">Finger Food</option>
                                    <option value="Buffet">Buffet</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex items-center gap-x-5 justify-center'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='text-gray-400'>Geographical Location</div>
                                <select
                                    id="geolocation"
                                    name="geolocation"
                                    value={geoLocation}
                                    onChange={e => setGeoLocation(e.target.value)}
                                    className='w-64 h-12 p-2 rounded-md text-gray-800 text-lg leading-none'
                                >
                                    <option value="">Select</option>
                                    <option value="Urban">Urban</option>
                                    <option value="Suburban">Suburban</option>
                                    <option value="Rural">Rural</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='text-gray-400'>Pricing</div>
                                <select
                                    id="pricing"
                                    name="pricing"
                                    value={pricing}
                                    onChange={e => setPricing(e.target.value)}
                                    className='w-64 h-12 p-2 rounded-md text-gray-800 text-lg leading-none'
                                >
                                    <option value="">Select</option>
                                    <option value="Low">Low</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        {isValuePredicted
                            ? <CustomLoader />
                            : <button
                                className='px-8 py-3 rounded-md cursor-pointer text-lg leading-none border border-gray-600 w-fit hover-btn'
                                onClick={predictionApiHandler}
                            >Predict</button>
                        }
                        {wastePrediction != null
                            ? <div className='px-6 py-3 border border-gray-600 rounded-md text-lg leading-none bg-gray-700 text-gray-100'>{wastePrediction < 0 ? "0" : wastePrediction}Kg of waste predicted.</div>
                            : null
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home