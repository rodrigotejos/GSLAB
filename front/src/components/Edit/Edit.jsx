import React, { Fragment, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Edit = () => {
  const location = useLocation();
  const [valuesEdit, setValuesEdit] = useState();
  const history = useHistory();

  useEffect(() => {
    const valuesEdit = location.values;
    //console.log("values::::", valuesEdit);
    setValuesEdit(valuesEdit);
  }, [location]);

  return (
    <Fragment>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Alterar o item selecionado
            </h2>
          </div>
          {valuesEdit ? (
            <Formik
              initialValues={{
                id_produto: valuesEdit.id_produto,
                nome: valuesEdit.nome,
                descri: valuesEdit.descri,
                valor: valuesEdit.valor,
              }}
              validate={(values) => {
                const errors = {};
                if (values.nome === "") {
                  errors.nome = "Faltou o nome";
                } else if (values.descri === "") {
                  errors.descri = "Faltou a descricao";
                } else if (values.valor === "") {
                  errors.valor = "Faltou a valor";
                }
                return errors;
              }}
              onSubmit={async (values) => {
                //console.log(values);
                try {
                  delete axios.defaults.headers.common["Sec-Fetch-Mode"];
                  await axios.put("api/produto", values, {
                    headers: { "Content-Type": "application/json" },
                  });
                  history.push("/");

                  // history.push("/");
                } catch (error) {
                  //setIsShowingAlert(true);
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
                        <label hemltFor="nome" className="sr-only">
                          Nome
                        </label>
                        <Field
                          id="nome"
                          name="nome"
                          type="nome"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                        {errors.nome && touched.nome && (
                          <div>{errors.nome}</div>
                        )}
                      </div>
                      <div>
                        <div>Descrição:</div>
                        <label htmlFor="descri" className="sr-only">
                          Descrição
                        </label>
                        <Field
                          id="descri"
                          name="descri"
                          type="descri"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                        {errors.descri && touched.descri && (
                          <div>{errors.descri}</div>
                        )}
                      </div>
                      <div>
                        <div>Valor:</div>
                        <label htmlFor="valor" className="sr-only">
                          Valor
                        </label>
                        <Field
                          id="valor"
                          name="valor"
                          type="valor"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                        {errors.valor && touched.valor && (
                          <div>{errors.valor}</div>
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
                        Alterar
                      </button>
                      <button
                        type="submit"
                        className=" w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                          history.push("/");
                        }}
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                        Cancelar
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          ) : (
            <div />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Edit;
