package phoneemulator;
import java.awt.Event;
import java.awt.event.ActionEvent;



/**
 *
 * This class impliments the Phone Interface and provides
 * A system which only allows for one call to take place
 * all other calls are automatically rejected through the 
 * use of exceptions.<br>
 * 
 * Although this is not realistic it makes the system much 
 * easier to impliment.<br>
 * 
 * 
 * The main purpose of this class is to simplfy the event handeling
 * nessisary to operate the phone. The handelCallEvent(CallEvent e)
 * method provides a controll structure for handeling incoming
 * events. <br>
 * 
 * 
 * The phone's State is also handeled.
 * 4 states are defined as static final ints
 * the local phone_state variable contains the phone's current state
 * <br>
 * 
 * The 4 states are defined as follows:<br>
 * 
 * DIALING  The phone is attempting to initate a call<br>
 * TALKING  There is a call in progress that has been accepted by the callee<br>
 * RINGING  There is an incoming call<br>
 * IDLE 	There is currently no call activity<br>
 * 
 * The phone state is private to prevent subclasses from 
 * making inappropriate state changes.
 * <br>
 * 
 * getPhoneState() will return the current state of the phone
 * <br>
 * 
 * @author Daniel J. Caruso
 * 
 * 
 */
public class SimplePhone implements Phone{


		private boolean debug = false;
	    //phone states.
	    
	    
		public final static int DIALING = 1;
		public final static int TALKING = 2;
		public final static int RINGING = 3;
		public final static int IDLE    = 4;
		
		private int phone_state = IDLE;
		
		Phone targetReciver = null; 
		
		private String myNumber = null;
		private String currentCallNumber = null;
		
				
		/**
		 * @see Phone#setTargetReciever(Phone)
		 * 
		 */
		public void setTargetReciever(Phone p)
		{
			targetReciver = p;
		}
		
		/**
		 * @see Phone#getTargetReciever()
		 */
		public Phone getTargetReciever()
		{
			return targetReciver;
		}
		

		/**
		 * Method handelCallEvent.
		 * 
		 * This Method is synchronized so that a state change must
		 * Be completed before other events can be processed.
		 * 
		 * Although this is generally bad for a real system it
		 * works well in our model since we only want to allow
		 * one call at a time.
		 * 
		 * Attempts to place more than one call will result
		 * in the throwing of a CallException.
		 * 
		 * @param e
		 */
        public synchronized void handelCallEvent(CallEvent e) throws CallException
        {
        	int id = e.getID();
        	
        	switch (id)
        	{
        		case (CallEvent.BEGIN):
        		{
        			  if(phone_state == SimplePhone.IDLE)
        			  {
        			  	this.currentCallNumber = e.getFrom();
        			  	phone_state = SimplePhone.RINGING;
        			  	//invoke call back method        			 
        			  	incomingCall(e);
        			  }
        			  else
        			  {
        			  	throw new CallException("Call in PROGRESS can not being a new call");
        			  }
        			  return;
        		}
        		        		
        		case (CallEvent.END):  
        		{
        			if (phone_state == SimplePhone.IDLE)
        			{
        			    //throw new CallException();
        			}
        			else
        			{        				
        				phone_state = SimplePhone.IDLE; 
        				this.currentCallNumber = e.getFrom();
        				//invoke call back method  
        				callEnded(e);
        				//this.currentCallNumber = null;
        			}
        			  return;	
        		}
        		
        		case (CallEvent.ACCEPT):   
        		{
        			if (phone_state == SimplePhone.DIALING)
        			{
        				phone_state = SimplePhone.TALKING;
        				//invoke call back method
        				this.currentCallNumber = e.getFrom();
        				callConnected(e);
        			}
        			else
        			throw new CallException("CALL in Progress can not accept new calls");
        			return;
	
        		} 
        		
        		default : throw new CallException("Unkown Call Exception id = " + e.getID()); 
        		        	        		
        	}
        }
        
	/**
	 * Method sendCallEvent.
	 * @param evt
	 * @throws CallException
	 */
      public synchronized void sendCallEvent(CallEvent evt) throws CallException
       {
       		if (debug) 
       		{
       			System.out.println("Sendnig callEvent\n evt id:" +evt.getID());
       		}
       			
       		
        	if (targetReciver == null)
        	{
        		 CallException ex = new CallException("target Reciver is null");
        		 throw ex;
        	}
        	
        	//send the appropriate event and change the state...accordingly.
        	switch(evt.getID())
        	{
        		case(CallEvent.BEGIN):
        		{
        			if (phone_state == SimplePhone.IDLE)
        			{
     				    //change state
        				phone_state = SimplePhone.DIALING;
        				this.currentCallNumber = evt.getTo();
        				//send event..
        				targetReciver.handelCallEvent(evt);

        			}
        			else throw new CallException("CALL in PROGRESS, can not being a new call");
        			return;
        		}
        		case(CallEvent.END):
        		{
        			if (phone_state == SimplePhone.IDLE)
        			{
        				//throw exception?
        			}
        			else
        			{
        				this.currentCallNumber = evt.getTo();
        				 //change state
        				phone_state = SimplePhone.IDLE;
        				
        				//send event
        				targetReciver.handelCallEvent(evt);

        				//this.currentCallNumber = null; //reset current call number
        			}
        			return;
        		}
        		case(CallEvent.ACCEPT):
        		{
        			if (phone_state == SimplePhone.RINGING)
        			{
        				 //change state
        				phone_state = SimplePhone.TALKING;
        				//send event.
        				
        				System.out.println("Sending Accept Event " +this.getClass().getName());
        				targetReciver.handelCallEvent(evt);

        			}
        			else throw new CallException ("BADNESS");
        			return;
        		}        		        	
        	}//end switch        	        	
        }
        
   
        
        
		/**
		 * Method incomingCall.
		 * @param evt
		 */
        void incomingCall(CallEvent evt)
        {

        }
        
		/**
		 * Method callEnded.
		 * @param evt
		 */
        void callEnded(CallEvent evt)
        {
	
        }
        
		/**
		 * Method callConnected.
		 * @param evt
		 */
        void callConnected(CallEvent evt)
		{
			
		}
        
        public int getPhoneState()
        {
        	return this.phone_state;
        }
        
        

		/**
		 * Returns  myNumber.
		 * The phone number of this phone
		 * @return String
		 */
		public String getMyNumber()
		{
			return myNumber;
		}

		/**
		 * Sets the myNumber.
		 * set the phone number of this phone
		 * Should only be called when the phone is idle
		 * Genrerally should only be called at construction time.
		 * @param myNumber The myNumber to set
		 */
		public void setMyNumber(String myNumber)
		{
			this.myNumber = myNumber;
		}

		/**
		 * Returns the number of the person we are currently
		 * calling, or who is calling us
		 * @return String
		 */
		public String getCurrentCallNumber()
		{
			return currentCallNumber;
		}



}
