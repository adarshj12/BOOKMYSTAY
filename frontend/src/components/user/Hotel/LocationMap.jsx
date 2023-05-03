
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Link
} from '@chakra-ui/react';
import { Map, Marker, NavigationControl } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
const TransitionExample = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Link mt={50} color={'blue.400'} onClick={onOpen}>View On Map</Link>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader position={'text-center'}>Map</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <Map mapLib={maplibregl}
              initialViewState={{
                longitude: 76.264960,
                latitude: 12.241470,
                zoom: 14
              }}
              style={{ width: "400px", height: " 300px" }}
              mapStyle="https://api.maptiler.com/maps/streets/style.json?key=9ff5lVBf8CGQXXVT8rwy"
            >
              <NavigationControl position="top-left" />
              <Marker
                longitude={76.264960}
                latitude={12.241470}

              />
            </Map>






          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TransitionExample;