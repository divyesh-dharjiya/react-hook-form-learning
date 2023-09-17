"use client";
import React from 'react';
import { useFieldArray, useForm } from "react-hook-form";
import dynamic from 'next/dynamic';

const DevTool = dynamic(() => import('@hookform/devtools').then((module) => module.DevTool), { ssr: false });

const Home = () => {
    const userForm = useForm({
        defaultValues: {
            student: [{ studentName: '', studentAddress: '', studentPhoneNumber: '', studentEmail: '' }],
        }
    });


    const { register, control, handleSubmit, formState } = userForm;
    const { errors } = formState;

    const { fields, append, remove } = useFieldArray({
        name: 'student',
        control
    });

    const onSubmit = (data) => {
        console.log('Form Submitted...', data);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-lg font-bold my-2">Form Array</div>
            <form className='w-3/6' onSubmit={handleSubmit(onSubmit)} noValidate>
                {
                    fields.map((field, index) => {
                        return (
                            <div key={field.id} className='border-2 border-black mb-3 p-4'>
                                <div className="display-inline flex justify-between items-center">
                                    <p className='text-black align-middle p-5 text-center bg-slate-300 w-full'>Student {index + 1}</p>
                                    {index > 0 && (
                                        <button type='button' className='bg-red-400 text-white p-2 float-right' onClick={() => { remove(index) }}>Remove Student</button>
                                    )}
                                </div>

                                <label htmlFor={`studentName${index}`}>studentName: </label>
                                <input type="text" id={`studentName${index}`} {...register(`student.${index}.studentName`, {
                                    required: {
                                        value: true,
                                        message: 'studentName is required*'
                                    }
                                })} />
                                <p>{errors.student?.[index]?.studentName?.message}</p>

                                <label htmlFor={`studentAddress${index}`}>studentAddress: </label>
                                <input type="text" id={`studentAddress${index}`} {...register(`student.${index}.studentAddress`, {
                                    required: {
                                        value: true,
                                        message: 'studentAddress is required*'
                                    }
                                })} />
                                <p>{errors.student?.[index]?.studentAddress?.message}</p>

                                <label htmlFor={`studentPhoneNumber${index}`}>studentPhoneNumber: </label>
                                <input type="text" id={`studentPhoneNumber${index}`} {...register(`student.${index}.studentPhoneNumber`, {
                                    required: {
                                        value: true,
                                        message: 'studentPhoneNumber is required*'
                                    }
                                })} />
                                <p>{errors.student?.[index]?.studentPhoneNumber?.message}</p>

                                <label htmlFor={`studentEmail${index}`}>studentEmail: </label>
                                <input type="text" id={`studentEmail${index}`} {...register(`student.${index}.studentEmail`, {
                                    required: {
                                        value: true,
                                        message: 'studentEmail is required*'
                                    }
                                })} />
                                <p>{errors.student?.[index]?.studentEmail?.message}</p>

                            </div>
                        )
                    })
                }
                <div className='flex flex-col justify-center items-center'>
                    <button type='button' className='bg-green-400 text-white p-5' onClick={() => { append({ studentName: "" }) }}>Add Student</button>
                    <button type='submit' className='bg-blue-400 mt-3 p-7 w-96 text-white'>Submit</button>
                </div>
            </form>
            <DevTool control={control} />
        </div>
    )
}

export default Home;