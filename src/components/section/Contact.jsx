'use client'
import React, { useRef } from 'react'
import SectionWrapper from '../hoc/SectionWrapper'
import { styles } from '@/styles/style'
import { motion } from 'framer-motion'
import { slideIn, staggerContainer } from '@/lib/motion'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { formSchema } from '@/lib/schema/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import Earth from '../canvas/Earth'
import { StarsCanvas } from '../canvas'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { sendMail } from '@/lib/utils'
const Contact = () => {
  return (
    <div className="relative w-full h-auto  mt-20">
      <motion.section
        variants={staggerContainer()}
        initial={'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} mx-auto max-w-7xl flex flex-col-reverse xl:flex-row gap-10 overflow-hidden`}
      >
        <motion.div
          variants={slideIn('left', 'tween', 0.2, 1)}
          className="flex-[0.75] bg-black-100 rounded-xl p-4 md:p-7"
        >
          <div className="px-4 py-3">
            <p className={`${styles.sectionSubText}`}>Get in touch</p>
            <h2
              className={`${styles.sectionHeadText} font-bold tracking-tight font-poppins`}
            >
              Contact.
            </h2>
            <div className="mt-6">
              <FormInputSection />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="xl:flex-1 xl:h-auto md:h-[500px] h-[300px]"
          variants={slideIn('right', 'tween', 0.2, 1)}
        >
          <Earth />
        </motion.div>
      </motion.section>
      <StarsCanvas />
    </div>
  )
}

const FormInputSection = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = async (values) => {
    console.log('Sending')
    await sendMail(values)
    console.log('Send')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  name="name"
                  placeholder="eg- John Doe"
                  className="!p-3 !bg-black-200 !border-none !outline-none !rounded-sm !placeholder:text-secondary"
                  value={field.value}
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  name="email"
                  className="!p-4 !bg-black-200 !border-none !outline-none !rounded-sm !placeholder:text-secondary"
                  type="email"
                  value={field.value}
                  placeholder="eg- someone@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  name="message"
                  placeholder="..."
                  rows={7}
                  className="!bg-black-200 !border-none !outline-none !rounded-sm !placeholder:text-secondary"
                  value={field.value}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />
        <Button
          className="bg-primary-purple rounded-sm hover:bg-primary-purple"
          type="submit"
        >
          Send
        </Button>
      </form>
    </Form>
  )
}

export default Contact