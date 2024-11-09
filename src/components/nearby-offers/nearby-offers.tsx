import { OfferList } from '../offer-list/offer-list';
import { OfferType } from '../../types/offer-type';


export default function NearbyOffersList({ offers }: {offers : OfferType[]}): JSX.Element {
  return (
    <div className="container">
        <section className="near-places places">
            <h2 className="near-places__title">
                Other places in the neighbourhood
            </h2>
            <OfferList offers={offers} />
        </section>
    </div>
  );
}