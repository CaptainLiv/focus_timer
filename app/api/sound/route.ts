import { soundFiles } from '@/generated/sounds';

export async function GET(request: Request) {
  return Response.json(soundFiles);
}