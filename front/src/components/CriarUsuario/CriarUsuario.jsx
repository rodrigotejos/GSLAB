import React, { Fragment, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Adicionar = (props) => {
  const history = useHistory();
  return (
    <Fragment>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Criar um usuario
            </h2>
          </div>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validate={(values) => {
              const errors = {};
              if (values.name === "") {
                errors.name = "Faltou o name";
              } else if (values.email === "") {
                errors.email = "Faltou o email";
              } else if (values.vapasswordlor === "") {
                errors.password = "Faltou a senha";
              }
              return errors;
            }}
            onSubmit={async (values) => {
              console.log(values);
              try {
                delete axios.defaults.headers.common["Sec-Fetch-Mode"];
                const response = await axios.post("api/user", values, {
                  headers: { "Content-Type": "application/json" },
                });

                // history.push("/");
              } catch (error) {
                //setIsShowingAlert(true);
              }
            }}
          >
            {({ errors, touched, isValidating, values, handleSubmit }) => {
              console.log("values", values);
              console.log("errors", errors);
              console.log("erros verify", Object.keys(errors).length === 0);
              return (
                <Form
                  className="mt-8 space-y-6"
                  onClick={() => console.log("sua api")}
                >
                  <input type="hidden" name="remember" value="true" />
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <div>Nome:</div>
                      <label hemltFor="name" className="sr-only">
                        Nome
                      </label>
                      <Field
                        id="name"
                        name="name"
                        type="name"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      />
                      {errors.name && touched.name && <div>{errors.name}</div>}
                    </div>
                    <div>
                      <div>Email:</div>
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      />
                      {errors.email && touched.email && (
                        <div>{errors.email}</div>
                      )}
                    </div>
                    <div>
                      <div>Senha:</div>
                      <label htmlFor="password" className="sr-only">
                        Senha
                      </label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      />
                      {errors.password && touched.password && (
                        <div>{errors.password}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className=" w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={handleSubmit}
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                      Criar Usuario
                    </button>
                    <button
                      type="submit"
                      className=" w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        history.push("/");
                      }}
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                      Voltar
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default Adicionar;
