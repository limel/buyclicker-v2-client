'use client'
import React from 'react'
import Button from 'components/UI/Button'
import Input from 'components/UI/Input'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { useTranslations } from 'next-intl'

export default function RegistrationForm() {
  const t = useTranslations('RegistrationForm')
  const tI = useTranslations('Inputs')
  const tV = useTranslations('Validation')

  const validationSchema = yup.object().shape({
    email: yup.string().email(tV('email')).required(tV('required')),
    password: yup.string().required(tV('required')),
  })

  return (
    <section className='pt-12 pb-24'>
      <div className='container'>
        <div className='w-max-[1082px] bg-white rounded-xl'>
          <h2 className='px-8 py-6 text-h2 border-b-[1px] border-stroke-light-gray'>
            {t('title')}
          </h2>
          <div className='flex flex-row items-start gap-16 pt-8 px-8 pb-16'>
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={(values) => {
                console.log(values)
              }}
            >
              <Form className='w-1/2 flex flex-col gap-8 relative after:absolute after:h-full after:border-r-[1px] after:border-dashed after:border-divider after:-right-8'>
                <legend className='text-h4 uppercase'>{t('legend')}</legend>
                <div role='group' className='flex flex-col gap-6'>
                  <Input
                    name='name'
                    label={tI('name.label')}
                    placeholder={tI('name.placeholder')}
                  />
                  <Input
                    name='lastName'
                    label={tI('lastName.label')}
                    placeholder={tI('lastName.placeholder')}
                  />
                  <Input
                    name='email'
                    label={tI('email.label')}
                    placeholder={tI('email.placeholder')}
                  />
                  <Input
                    name='phone'
                    label={tI('phone.label')}
                    placeholder='+380 (_ _ _)'
                  />
                  <Input
                    name='password'
                    label={tI('password.label')}
                    placeholder={tI('password.placeholderCreate')}
                  />
                </div>
                {/* <div className='flex items-center gap-6' role='group'>
                  <Button type='submit'>{t('button')}</Button>
                  <span className='text-link text-primary-gray underline cursor-not-allowed'>
                    {t('forgotPassword')}
                  </span>
                </div> */}
              </Form>
            </Formik>
            <div className='w-1/2'>
              <h2 className='text-h4 uppercase mb-4'>{t('titleOptions')}</h2>
              {/* <p className='mb-8 text-small'>{t('titleOptions')}</p> */}
              <Button type='submit' color='peachy'>
                {t('button')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
