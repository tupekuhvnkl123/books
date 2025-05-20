import { ReactSVG } from "react-svg";
import S from "./Inputs.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { NewProductCtx } from "../../../context/NewProductCtx";
import ErrorMsg from "./ErrorMsg";
import SelectCity from "../../Purchased/Content/Settings/Form/SelectCity";
import CategoriesList from "./CategoriesList";

type InputsProps = {
  city?: string;
  phoneNumber?: string;
};

const Inputs = ({ city, phoneNumber }: InputsProps) => {
  const { updateProductData, productData, errors } = useContext(NewProductCtx);
  const [showCategories, setShowCategories] = useState(false);
  const categoriesWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (city) {
      updateProductData("city", city);
    }
    if (phoneNumber) {
      updateProductData("phoneNumber", phoneNumber);
    }
  }, [city, phoneNumber]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        categoriesWrapperRef.current &&
        !categoriesWrapperRef.current.contains(e.target as Node)
      ) {
        setShowCategories(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={S.container}>
      <div className={S.inputContainer}>
        <input
          type="text"
          name="title"
          placeholder="כותרת"
          value={productData.title || ""}
          onChange={(e) => updateProductData("title", e.target.value)}
        />
      </div>
      <ErrorMsg err={errors.title} />
      <div className={S.inputContainer}>
        <ReactSVG src="icons/NewProduct/shekel.svg" style={{ height: 17 }} />
        <input
          type="number"
          name="price"
          placeholder="מחיר"
          value={productData.price || ""}
          onChange={(e) => updateProductData("price", e.target.value)}
        />
      </div>
      <ErrorMsg err={errors.price} />
      <div className={S.inputContainer} ref={categoriesWrapperRef}>
        <input
          type="text"
          name="category"
          placeholder="קטגוריה"
          value={productData.category || ""}
          onFocus={() => setShowCategories(true)}
          onChange={() => {}}
        />
        {showCategories && (
          <CategoriesList closeList={() => setShowCategories(false)} />
        )}
      </div>
      <ErrorMsg err={errors.category} />
      <div className={`${S.inputContainer} ${S.description}`}>
        <textarea
          name="description"
          placeholder="תיאור"
          value={productData.description || ""}
          onChange={(e) => updateProductData("description", e.target.value)}
        />
      </div>
      <ErrorMsg err={errors.description} />
      <SelectCity
        city={city}
        value={productData.city || ""}
        onChange={(city) => updateProductData("city", city)}
        className={S.cityContainer}
      />
      <ErrorMsg err={errors.city} />
      {phoneNumber ? (
        <div className={S.phoneNumberExist}>
          <div>
            <label>מספר פלאפון :</label>
            <span>{phoneNumber}</span>
          </div>
          <p>כנס להגדרות פרופיל כדי לשנות</p>
        </div>
      ) : (
        <>
          <div className={S.inputContainer}>
            <ReactSVG src="icons/NewProduct/phone.svg" style={{ height: 15 }} />
            <input
              type="number"
              name="phoneNumber"
              placeholder="מספר פלאפון"
              className={S.grey}
              value={productData.phoneNumber || ""}
              onChange={(e) => updateProductData("phoneNumber", e.target.value)}
            />
          </div>
          <ErrorMsg err={errors.phoneNumber} />
        </>
      )}
    </div>
  );
};

export default Inputs;
