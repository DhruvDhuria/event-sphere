"use client"
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@/models/Category";
import * as z from "zod";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";
import { format } from "date-fns";

import Button from "./Button";
import { Calender } from "./ui/calender";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from "./ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { eventsSchema } from "@/schemas/eventsSchema";
import { Textarea } from "./ui/textarea";

type EventFormValues = z.infer<typeof eventsSchema>;


interface EventFormProps {
  onSubmit: (data: EventFormValues) => void;
  defaultValues?: Partial<EventFormValues>;
  isEditMode?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  defaultValues,
  isEditMode = false,
}) => {

  const [categories, setCategories] = React.useState<Array<Category>>([])
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventsSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      date: defaultValues?.date || undefined,
      time: defaultValues?.time || "",
      location: defaultValues?.location || "",
      category: defaultValues?.category || "",

    },
  });

  const fetchCategories = useCallback(async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
     setCategories(data.categories)
     
  },[])

  
  useEffect(() => {
    fetchCategories()
  },[])

  function handleSubmit(data: EventFormValues) {
    onSubmit(data);
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditMode ? "Edit Event" : "Create New Event"}</CardTitle>
        <CardDescription>
          Fill in the details below to{" "}
          {isEditMode ? "update your" : "create a new"} event.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-6 md:col-span-2">
                <h3 className="text-lg font-medium">Basic Information</h3>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter event title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Be clear and descriptive.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detailed Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide detailed information about your event"
                          {...field}
                          className="min-h-[150px]"
                        />
                      </FormControl>
                      <FormDescription>
                        Include all relevant details about what attendees can
                        expect.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date and Time */}
              <div className="space-y-6 md:col-span-2">
                <h3 className="text-lg font-medium">Date and Time</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Event Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  <span>{format(field.value, "PPP")}</span>
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 bg-background"
                            align="start"
                          >
                            <Calender
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              className="pointer-events-auto bg-background"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                            <FormControl>
                              <Input placeholder="e.g. 9:00 AM" {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Location and Category */}
              <div className="space-y-6 md:col-span-2">
                <h3 className="text-lg font-medium">Location and Category</h3>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                        <FormControl>
                          <Input
                            placeholder="Enter event location"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormDescription>
                        Physical address or online platform
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Event Image */}
              <div className="space-y-6 md:col-span-2">
                <h3 className="text-lg font-medium">Event Image</h3>

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <div className="flex items-center">
                        <ImageIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                        <FormControl>
                          <Input
                            type="file"
                            placeholder="Select an image"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files?.length) {
                                field.onChange(files[0]);
                              }
                            }}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                          />
                        </FormControl>
                      </div>
                      <FormDescription>
                        Upload an image that represents your event
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <CardFooter className="flex justify-end space-x-4 px-0">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? "Update Event" : "Create Event"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EventForm;
