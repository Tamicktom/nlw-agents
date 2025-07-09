//* Libraries imports
import { useQuery } from "@tanstack/react-query";
import z from "zod";

//* Local imports
import { apiURL } from "@/utils/api";

//* Schemas imports
import { paginatedRoomSchema } from "@/schemas/rooms";
import { pagination } from "@/schemas/pagination";

const apiResponseSchema = z.object({
  rooms: paginatedRoomSchema.array(),
  pagination: pagination,
})

async function getRooms() {
  const url = apiURL("/rooms");

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