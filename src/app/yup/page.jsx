"use client";
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import dynamic from 'next/dynamic';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object({
    username: yup.string().required("Username is required**"),
    email: yup.string().required("Email is required**").email("Enter valid email**"),
    channelName: yup.string().required("Channel Name is required**"),

})

const DevTool = dynamic(() => import('@hookform/devtools').then((module) => module.DevTool), { ssr: false });

const YupValidation = () => {
    const userForm = useForm({
        defaultValues: {
            username: '',
            email: '',
            channelName: ''
        },
        resolver: yupResolver(schema)
        // mode: "onChange"
            // onBlur: "onBlur"
            // onChange: "onChange"
            // onSubmit: "onSubmit"
            // onTouched: "onTouched"
            // all: "all"
    });
    const { register, control, handleSubmit, formState, watch, getValues, setValue, reset, trigger } = userForm;
    const { errors, isSubmitSuccessful } = formState;

    const onSubmit = (data) => {
        console.log('Form Submitted...', data);
    }

    const handleGetValues = () => {
        console.log("get Values", getValues());
    }

    const handleSetValues = () => {
        console.log("hello")
        setValue("username", "", {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    }

    //Watch Code inside useEffect
    // const subscrption = watch((value) => {
    //     console.log(value);
    // });
    // return () => subscrption.unsubscribe();
    // [watch]

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]); 

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-lg font-bold my-2 text-center">Yup Validations</div>
            <form className='w-3/6' onSubmit={handleSubmit(onSubmit)} noValidate>
                <label htmlFor="username" className='form-label'>Username: </label>
                <input type="text" id="username" {...register('username')} />
                <p>{errors.username?.message}</p>

                <label htmlFor="email" className='form-label'>Email: </label>
                <input type="text" id="email" {...register('email')} />
                <p>{errors.email?.message}</p>

                <label htmlFor="channelName" className='form-label'>Channel Name: </label>
                <input type="text" id="channelName" {...register('channelName')} />
                <p>{errors.channelName?.message}</p>

                <div>
                <button type='button' className='bg-pink-400 text-white my-3 w-72 p-3 mr-3' onClick={handleGetValues}>Get Values</button>
                <button type='button' className='bg-yellow-500 text-white my-3 w-72 p-3' onClick={handleSetValues}>Set Values</button>
                </div>
                {/* for disable button disabled={!isDirty || !isValid || isSubmitting} */}
                <div>
                <button type="button" className='bg-green-600 mt-5 w-72 disabled:bg-blue-100 p-3 text-white mr-3' onClick={() => reset()}>Reset Form</button>
                <button type='submit' className='bg-cyan-600 mt-5 w-72 disabled:bg-blue-100 p-3 text-white mr-3' onClick={() => trigger()}>Trigger</button>
                </div>

                <div>
                <button type='submit' className='bg-blue-600 mt-5 w-72 disabled:bg-blue-100 p-3 text-white'>Submit</button>
                </div>
            </form>
            <DevTool control={control} />
        </div>
    )
}

export default YupValidation;