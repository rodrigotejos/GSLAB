import React, { Fragment, useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Adicionar = () => {
  const history = useHistory();
  const [isShowingAlert, setIsShowingAlert] = useState(false);
  return (
    <Fragment>
      {isShowingAlert ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Error
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">email já existe</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsShowingAlert(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Criar um usuário
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
                errors.name = "Faltou o nome";
              } else if (values.email === "") {
                errors.email = "Faltou o email";
              } else if (values.vapasswordlor === "") {
                errors.password = "Faltou a senha";
              }
              return errors;
            }}
            onSubmit={async (values) => {
              //console.log(values);
              try {
                delete axios.defaults.headers.common["Sec-Fetch-Mode"];
                await axios.post("api/user", values, {
                  headers: { "Content-Type": "application/json" },
                });

                history.push("/");
              } catch (error) {
                setIsShowingAlert(true);
              }
            }}
          >
            {({ errors, touched, isValidating, values, handleSubmit }) => {
              //console.log("values", values);
              //console.log("errors", errors);
              //console.log("erros verify", Object.keys(errors).length === 0);
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
