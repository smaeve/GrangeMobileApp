package io.ionic.starter;

import androidx.appcompat.app.AppCompatActivity;

//facebook imports
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

import android.os.Bundle;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.getcapacitor.BridgeActivity;

//import android.os.Bundle;

//import androidx.annotation.NonNull;
//import androidx.fragment.app.FragmentActivity;

//import com.getcapacitor.BridgeActivity;
//import com.google.android.gms.maps.CameraUpdateFactory;
//import com.google.android.gms.maps.GoogleMap;
//import com.google.android.gms.maps.OnMapReadyCallback;
//import com.google.android.gms.maps.SupportMapFragment;
//import com.google.android.gms.maps.model.LatLng;
//import com.google.android.gms.maps.model.MarkerOptions;

/*public class MainActivity extends FragmentActivity implements OnMapReadyCallback {

  GoogleMap mapAPI;
  SupportMapFragment mapFragment;

  @Override
  protected void onCreate(Bundle savedInstanceState){
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    mapFragment = (SupportMapFragment) getSupportFragmentManager()
      .findFragmentById(R.id.mapAPI);

    mapFragment.getMapAsync(this::onMapReady);
  }

  @Override
  public void onMapReady(@NonNull GoogleMap googleMap) {

    mapAPI = googleMap;
    LatLng Grangegorman = new LatLng(53.354921043407764, -6.2795366726512745);

    mapAPI.addMarker(new MarkerOptions().position(Grangegorman).title("Grangegorman"));

    mapAPI.moveCamera(CameraUpdateFactory.newLatLng(Grangegorman));
  }
}*/
import com.getcapacitor.BridgeActivity;
 
public class MainActivity extends BridgeActivity {

  public void onCreate(Bundle savedInstanceState){
    super.onCreate(savedInstanceState);

    registerPlugin(GoogleAuth.class);
  }
}
