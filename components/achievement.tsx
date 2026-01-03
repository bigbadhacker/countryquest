import {
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Progress,
  SkeletonText,
  Text,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { CalculatedAchievement } from '../atoms/achievements'

const MotionCard = motion(Card)

type Props = {
  isLoading?: boolean
  includesWishes?: boolean
  achievement: CalculatedAchievement
}

export default function Achievement({
  isLoading = false,
  includesWishes = false,
  achievement: {
    description,
    formattedMaxValue,
    formattedValue,
    name,
    progress,
    unit,
  },
}: Props) {
  return (
    <MotionCard
      layoutId={name}
      // Avoid skeleton translations on load
      layout={!isLoading && 'position'}
      variant="outline"
    >
      <CardBody>
        <SkeletonText isLoaded={!isLoading}>
          <VStack align="stretch">
            <HStack>
              <Box flex="1">
                <Heading as="h3" fontSize="1xl">
                  {name}
                </Heading>
                <Text fontSize="sm">{description}</Text>
              </Box>
              <Text as="span" fontSize="3xl" lineHeight="1">
                🏆
              </Text>
            </HStack>
            <HStack>
              <Progress
                borderRadius="full"
                flex="1"
                hasStripe={includesWishes}
                max={1}
                value={progress}
              />
              <Text fontSize="xs" textAlign="end">
                {formattedValue} / {formattedMaxValue} {unit}
              </Text>
            </HStack>
          </VStack>
        </SkeletonText>
      </CardBody>
    </MotionCard>
  )
}
