import axios from "axios";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import COLORS from "../../constants/colors";
import url from "../../constants/url";
import { countryActions } from "../../store/countrySlice";
import { regionsActions } from "../../store/regionsSlice";
import s from "./Main.module.css";

const Main = () => {
  const regions = useSelector((state) => state.regions);
  const country = useSelector((state) => state.country);
  const regionsList = regions.list || [];
  const countryList = country.list || [];
  const selectedRegion = regions.selectedRegion;
  const selectedCountry = country.selectedCountry;
  const selectedCountryObject = country.selectedCountryObject;
  const selectedRegionIndex = regionsList.findIndex(
    (region) => region.name == selectedRegion
  );
  const color = selectedRegionIndex > -1 ? COLORS[selectedRegionIndex] : "";
  const dispatch = useDispatch();
  const setSelectedRegion = useCallback(
    async (region) => {
      const response = await axios.get(`${url.GET_COUNTRIES}/${region.region}`);
      if (response.status == 200) {
        const data = response.data;
        dispatch(countryActions.setCountryList(data));
        dispatch(countryActions.setSelectedCountry(null));
        dispatch(countryActions.setSelectedCountryObject({}));
        dispatch(regionsActions.setSelectedRegion(region.name));
      } else alert("Failed to fetch the countries list! Please try again!");
    },
    [dispatch]
  );
  const setSelectedCountry = useCallback(
    async (country) => {
      let countries = JSON.parse(localStorage.getItem("countries")) || [];
      let c = countries.findIndex((c) => c.name == country.name);
      let response = {};
      let cItem = {};
      console.log(countries, c);
      if (c > -1) {
        cItem = countries[c];
        response.status = 200;
        response.data = [cItem];
      } else {
        response = await axios.get(
          `${url.GET_COUNTRY_DETAILS}/${country.capital}`
        );
      }
      if (response.status == 200) {
        const data = response.data;
        dispatch(countryActions.setSelectedCountryObject(data[0]));
        dispatch(countryActions.setSelectedCountry(country.name));
        c == -1 && countries.push(data[0]);
        localStorage.setItem("countries", JSON.stringify(countries));
      } else alert("Failed to fetch the country details! Please try again!");
    },
    [dispatch]
  );
  return (
    <div className={s.main}>
      <Formik>
        {({ values }) => (
          <Form className={s.form}>
            <div className={s.wrapper}>
              <FieldArray
                name="regions"
                render={(arrayHelpers) => (
                  <div className={s.listWrapper}>
                    <div className={s.label}>Select a Region</div>
                    <div className={s.listContainer}>
                      {regionsList.map((region, regIdx) => (
                        <div
                          className={s.listItem}
                          key={region.name + regIdx}
                          title={region.name}
                          style={{
                            backgroundColor: COLORS[regIdx],
                          }}
                          onClick={
                            selectedRegion != region.name
                              ? () => setSelectedRegion(region)
                              : null
                          }
                        >
                          <div className={s.text}>{region.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              />
              {countryList.length > 0 && (
                <FieldArray
                  name="countries"
                  render={(arrayHelpers) => (
                    <div className={s.listWrapper}>
                      <div className={s.label}>Select a Country</div>
                      <div className={s.listContainer}>
                        {countryList.map((country, countryIdx) => (
                          <div
                            className={`${s.listItem} ${s.countryListItem} ${
                              selectedCountry == country.name ? s.selected : ""
                            } `}
                            key={country.name + countryIdx}
                            title={country.name}
                            onClick={
                              selectedCountry != country.name
                                ? () => setSelectedCountry(country)
                                : null
                            }
                          >
                            <div className={s.text}>{country.name}</div>
                            <div
                              className={s.icon}
                              style={{
                                backgroundImage: `url(${country.flag})`,
                              }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                />
              )}
            </div>
            {selectedCountry != null && (
              <Field name="countryDetails">
                {(field) => {
                  const {
                    region,
                    name,
                    flag,
                    alpha3Code,
                    capital,
                    currencies = [],
                    demonym,
                    callingCodes = [],
                    population,
                  } = selectedCountryObject;
                  return (
                    <div className={s.countryDetails}>
                      <div className={s.countryContinentName}>
                        {region}/<span>{name}</span>
                      </div>
                      <div className={s.container}>
                        <div
                          className={s.flag}
                          style={{
                            backgroundImage: `url(${flag})`,
                          }}
                        ></div>
                        <div className={s.textContainer}>
                          <div className={s.countryName}>
                            {name}
                            <span className={s.isoCode}>({alpha3Code})</span>
                          </div>
                          <div className={s.capital}>{capital}</div>
                        </div>
                      </div>
                      <div className={s.inputContainer}>
                        <div className={s.input}>
                          <div className={s.text}>Demonym</div>
                          <div className={s.text}>{demonym}</div>
                        </div>
                        <div className={s.input}>
                          <div className={s.text}>Calling Code</div>
                          <div className={s.text}>{callingCodes[0]}</div>
                        </div>
                        <div className={s.input}>
                          <div className={s.text}>Currency</div>
                          <div className={s.text}>
                            {currencies[0].symbol} {currencies[0].name}
                          </div>
                        </div>
                        <div className={s.input}>
                          <div className={s.text}>Population</div>
                          <div className={s.text}>{population}</div>
                        </div>
                      </div>
                    </div>
                  );
                }}
              </Field>
            )}
          </Form>
        )}
      </Formik>
      <style jsx global>{`
        html {
          --primary-color: ${color};
          --secondary-color: ${color + "B3"};
          --tertiary-color: ${color + "D9"};
        }
      `}</style>
    </div>
  );
};

export default Main;
