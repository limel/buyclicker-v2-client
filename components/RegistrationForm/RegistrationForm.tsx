'use client'
import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { useTranslations } from 'next-intl'
import * as yup from 'yup'
import { useAddUserMutation } from 'lib/store/features/user/userApi'
import Button from 'components/UI/Button'
import Input from 'components/UI/Input'
import DatePickerInput from 'components/UI/DatePickerInput'
import GenderRadio from 'components/GenderRadio'
import Checkbox from 'components/UI/Checkbox'
import Modal from 'components/UI/Modal'

export default function RegistrationForm() {
  const [openModal, setOpenModal] = useState(true)
  const t = useTranslations('RegistrationForm')
  const tI = useTranslations('Inputs')
  const tV = useTranslations('Validation')
  const [addUser, { isError, isLoading, isSuccess }] = useAddUserMutation()
  const validationSchema = yup.object().shape({
    name: yup.string().min(2, tV('min')).required(tV('required')),
    lastName: yup.string().min(2, tV('min')).required(tV('required')),
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
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              name: '',
              lastName: '',
              birthdate: '',
              email: '',
              gender: 'male', // default value if need change than change defaultChecked in GenderRadio.tsx too
              phone: '',
              password: '',
              reciveMail: true, // same as for gender
              confirm: false,
            }}
            onSubmit={(values) => {
              console.log(isError, isLoading, isSuccess)

              values.email = values.email.trim().toLowerCase()
              addUser(values)
              // setOpenModal(isSuccess)
            }}
          >
            {(props) => (
              <Form className='flex flex-row items-start gap-16 pt-8 px-8 pb-16'>
                <div className='w-1/2 flex flex-col gap-8 relative after:absolute after:h-full after:border-r-[1px] after:border-dashed after:border-divider after:-right-8'>
                  <legend className='text-h4 uppercase'>{t('legend')}</legend>
                  <div role='group' className='flex flex-col space-y-6'>
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
                    <DatePickerInput name='birthdate' />
                    <GenderRadio name='gender' />
                    <Input
                      name='phone'
                      label={tI('phone.label')}
                      placeholder='+380 (_ _ _)'
                    />
                    <Input
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      label={tI('password.label')}
                      placeholder={tI('password.placeholderCreate')}
                    />
                  </div>
                </div>
                <div className='w-1/2'>
                  <h2 className='text-h4 uppercase mb-6'>
                    {t('titleOptions')}
                  </h2>
                  <Checkbox
                    label={tI('reciveMail.label')}
                    name='reciveMail'
                    defaultChecked
                    wrapperclassname='mb-4'
                  />
                  <Checkbox
                    label={tI('confirm.label')}
                    name='confirm'
                    wrapperclassname='mb-8'
                  />
                  <Button
                    type='submit'
                    color='peachy'
                    disabled={!props.values.confirm}
                  >
                    {t('button')}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <Modal
            selector='modal'
            openModal={openModal}
            setOpenModal={setOpenModal}
          >
            <span>success</span>
          </Modal>
        </div>
      </div>
    </section>
  )
}
