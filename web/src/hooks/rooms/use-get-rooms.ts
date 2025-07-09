//* Libraries imports
import { useQuery } from "@tanstack/react-query";
import z from "zod";

//* Local imports
import { apiURL } from "@/utils/api";

const paginatedRoomSchema = z.object({
  id: z.string(),
  name: z.string()
});

const pagination = z.object({
  page: z.number(),
  limit: z.number(),
  totalItems: z.number(),
  totalPages: z.number()
});

const apiResponseSchema = z.object({
  rooms: paginatedRoomSchema.array(),
  pagination: pagination,
})

async function getRooms() {
  const url = apiURL("/rooms");
  console.log("url: ", url);
  const response = await fetch(url);

  const data = apiResponseSchema.parse(await response.json());

  return data;
}

export function useGetRooms() {
  return useQuery({
    queryKey: ["get-rooms"],
    queryFn: getRooms,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}